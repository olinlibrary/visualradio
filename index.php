<?php

$f3=require('lib-fatfree/base.php');
require('video.php');
require('channel.php');

$f3->set('DEBUG',1);
$f3->config('config.ini');
$f3->set('db',new DB\SQL('sqlite:db/visualradio.db'));

$f3->route('GET /', function($f3) {
	echo Template::instance()->render('templates/index.html');
});

$f3->route('GET @channelList: /channels', 'Channel->viewAll');
$f3->route('POST /channels', 'Channel->listJSON');

$f3->route('GET /channel/new', 'Channel->addForm');
$f3->route('POST /channel/new', 'Channel->add');
$f3->route('GET /channel/@channelID/edit', 'Channel->editForm');
$f3->route('POST /channel/@channelID/edit', 'Channel->edit');

$f3->route('POST /channel/@channelID/status', 'Channel->status');
$f3->route('GET /channel/@channelID/new', 'Video->addForm');
$f3->route('POST /channel/@channelID/new', 'Video->add');
$f3->route('GET /channel/@channelID/@videoID', 'Video->editForm');
$f3->route('POST /channel/@channelID/@videoID', 'Video->edit');
$f3->route('POST /channel/@channelID/@videoID/delete', 'Video->delete');

// Create Schedule
// $f3->route('GET /schedule/@channel', schedule_create($f3));


$f3->run();
