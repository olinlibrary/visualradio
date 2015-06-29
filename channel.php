<?php

class Channel {

	function viewAll($f3){
		$db = $f3->get('db');

		// Get Channels
		$channels = new Db\SQL\Mapper($f3->get('db'), 'channels');
		$channels = $channels->find();
		$f3->set('channels', $channels);

		// Get Videos
		$videos = new Db\SQL\Mapper($f3->get('db'), 'videos');
		foreach($channels as $channel)
			$videoArray[$channel->id] = $videos->find(array('channel=?', $channel->id));
		$f3->set('videos', $videoArray);

		echo Template::instance()->render('templates/channels.html');
	}

	function status($f3){
		$db = $f3->get('db');
		$time = time();

		// Get Current Entry in Schedule
		getCurrent:
		$schedule = new Db\SQL\Mapper($f3->get('db'), 'schedule');
		$schedule->load(
			array('startTime <= :time AND endTime > :time AND channel = :ch', 
				':time' => $time, 
				':ch'   => $f3->get('PARAMS.channelID')),
			array('order'=>'startTime DESC'));

		if($schedule->dry())
			if($this->buildSchedule($f3))
				goto getCurrent;

		// Get Youtube Video
		$video = new Db\SQL\Mapper($f3->get('db'), 'videos');
		$video->load(array('id=?', $schedule->video));

		if($video->youtubeID == null){
			$f3->error(400);
			die();
		}

		$status = array();
		$status['youtubeID'] = $video->youtubeID;
		$status['currentTime'] = $time + $video->startTime - $schedule->startTime;

		echo json_encode($status);

		// Update Channel Count
		$channel = new Db\SQL\Mapper($f3->get('db'), 'channels');
		$channel->load(array('id=?', $f3->get('PARAMS.channelID')));
		$channel->hours += 2.5/60;
		$channel->save();
	}

	function buildSchedule($f3){
		$db = $f3->get('db');

		// Load Videos
		$videos = new Db\SQL\Mapper($f3->get('db'), 'videos');
		$videos = $videos->find(array('channel=?',$f3->get('PARAMS.channelID')));

		// Clear Existing Schedule
		$db->exec('DELETE FROM schedule WHERE channel=?',$f3->get('PARAMS.channelID'));

		// Shuffle Playlist
		shuffle($videos);

		// Build Schedule
		$schedule = new Db\SQL\Mapper($f3->get('db'), 'schedule');
		$time = time();
		foreach($videos as $video){
			$schedule->reset();
			$schedule->channel = $f3->get('PARAMS.channelID');
			$schedule->video = $video->id;
			$schedule->startTime = $time;
			$time += $video->endTime - $video->startTime;
			$schedule->endTime = $time;
			$schedule->save();
		}

		return count($videos);
	}

	function addForm($f3){
		echo Template::instance()->render('templates/channel.add.html');
	}

	function add($f3){
		$channel = new DB\SQL\Mapper($f3->get('db'),'channels');
		if($f3->get('POST.channelID'))
			$channel->id = $f3->get('POST.channelID');
		$channel->name = $f3->get('POST.name');
		$channel->save();
		$f3->reroute('@channelList');
	}

	function editForm($f3){
		$channel = new DB\SQL\Mapper($f3->get('db'),'channels');
		$channel = $channel->load(array('id=?', $f3->get('PARAMS.channelID')));
		$f3->set('channel',$channel);
		echo Template::instance()->render('templates/channel.edit.html');
	}

	function edit($f3){
		$channel = new DB\SQL\Mapper($f3->get('db'),'channels');
		$channel->load(array('id=?', $f3->get('PARAMS.channelID')));

		// Delete Channel
		if($f3->get('POST.delete') == '1'){
			$channel->erase();
			$f3->reroute('@channelList');

		// Update Name
		}else{
			$channel->name = $f3->get('POST.name');
			$channel->save();
			$f3->reroute('@channelList');
		}

	}

}
