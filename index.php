<?php

$f3=require('vendor/bcosca/fatfree/base.php');
$f3->config('config.cfg');
require('video.php');
require('channel.php');
require('user.php');

$f3->set('DEBUG',1);
$f3->set('db',new DB\SQL('sqlite:'.$f3->get('DATABASE_FILE')));
$f3->set('CACHE', true); // Required For Sessions
new Session();

if($f3->get('ALLOW_EMBED'))
	$f3->set('XFRAME',0);

$f3->route('GET /', function($f3) {
	// Get Channels
	$channels = new Db\SQL\Mapper($f3->get('db'), 'channels');
	$f3->set('channels', $channels->find());
	$f3->set('KIOSK', false);

	echo Template::instance()->render('templates/index.html');
});
$f3->route('GET /kiosk', function($f3) {
	$channels = new Db\SQL\Mapper($f3->get('db'), 'channels');
	$f3->set('channels', $channels->find());
	$f3->set('KIOSK', 'kiosk');
	echo Template::instance()->render('templates/index.html');
});
$f3->route('GET /channel/@channelID/status', 'Channel->status');

if(!$f3->get('READ_ONLY')){
	if(!$f3->get('LOGIN') || $f3->get('SESSION')){
		$f3->route('GET @channelList: /channels', 'Channel->viewAll');
		$f3->route('GET /channel/new', 'Channel->addForm');
		$f3->route('POST /channel/new', 'Channel->add');
		$f3->route('GET @channelEdit: /channel/@channelID/edit', 'Channel->editForm');
		$f3->route('POST /channel/@channelID/edit', 'Channel->edit');
		$f3->route('GET /channel/@channelID/new', 'Video->addForm');
		$f3->route('POST /channel/@channelID/new', 'Video->add');
		$f3->route('GET /channel/@channelID/@videoID', 'Video->editForm');
		$f3->route('POST /channel/@channelID/@videoID', 'Video->edit');
	}else{
		$f3->route('GET /channels', 'User->loginForm');
		$f3->route('POST /login', 'User->loginPost');
	}
}

$f3->run();
