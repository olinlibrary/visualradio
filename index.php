<?php

$f3=require('lib-fatfree/base.php');
$f3->config('config.cfg');
require('video.php');
require('channel.php');

$f3->set('DEBUG',1);
$f3->set('db',new DB\SQL('sqlite:'.$f3->get('databaseFile')));

$f3->route('GET /', function($f3) {
	// Get Channels
	$channels = new Db\SQL\Mapper($f3->get('db'), 'channels');
	$f3->set('channels', $channels->find());

	echo Template::instance()->render('templates/index.html');
});
$f3->route('GET /channel/@channelID/status', 'Channel->status');

if(!$f3->get('readonly')){
	$f3->route('GET @channelList: /channels', 'Channel->viewAll');
	$f3->route('GET /channel/new', 'Channel->addForm');
	$f3->route('POST /channel/new', 'Channel->add');
	$f3->route('GET @channelEdit: /channel/@channelID/edit', 'Channel->editForm');
	$f3->route('POST /channel/@channelID/edit', 'Channel->edit');
	$f3->route('GET /channel/@channelID/new', 'Video->addForm');
	$f3->route('POST /channel/@channelID/new', 'Video->add');
	$f3->route('GET /channel/@channelID/@videoID', 'Video->editForm');
	$f3->route('POST /channel/@channelID/@videoID', 'Video->edit');
}


$f3->run();
