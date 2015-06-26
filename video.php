<?php

class Video {

	function addForm($f3){
		echo Template::instance()->render('templates/video.add.html');
	}

	function add($f3){
		$video = new DB\SQL\Mapper($f3->get('db'),'videos');
		$video->channel   = $f3->get('PARAMS.channelID');
		$video->youtubeID = $f3->get('POST.youtubeID');
		$video->startTime = $f3->get('POST.startTime');
		$video->endTime   = $f3->get('POST.endTime');
		$video->save();
		$f3->reroute('@channelList');
	}

	function editForm($f3){
		$video = new DB\SQL\Mapper($f3->get('db'),'videos');
		$video = $video->load(array('id=?', $f3->get('PARAMS.videoID')));
		$f3->set('video',$video);
		echo Template::instance()->render('templates/video.edit.html');
	}

	function edit($f3){
		$video = new DB\SQL\Mapper($f3->get('db'),'videos');
		$video->load(array('id=?', $f3->get('PARAMS.videoID')));

		if($f3->get('POST.delete') == '1'){
			$video->erase();
		}else{
			$video->startTime = $f3->get('POST.startTime');
			$video->endTime   = $f3->get('POST.endTime');
			$video->save();
		}

		$f3->reroute('@channelList');
	}
}
