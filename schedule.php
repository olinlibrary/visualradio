<?php

require 'config.php';

if(!isset($_GET['ch'])){
	http_response_code(403);
	die('No Channel Specified');
}

// Load Channel
$db = new SQLite3($DATABASE);
$query = $db->prepare('SELECT playlist,shuffle FROM channels WHERE id = :id');
$query->bindValue(':id', $_GET['ch'], SQLITE3_INTEGER);
$channel = $query->execute()->fetchArray(SQLITE3_ASSOC);

// If Channel Invalid
if(!$channel){
	http_response_code(400);
	die('Invalid Channel');
}

// Clear Existing Schedule
$query = $db->prepare('DELETE FROM schedule WHERE channel = :ch');
$query->bindValue(':ch', $_GET['ch'], SQLITE3_INTEGER);
$query->execute();

// Get Playlist & Shuffle if Necessary
$playlist = json_decode($channel['playlist']);
if($channel['shuffle'])
	shuffle($playlist);

// Build Schedule
$time = time();
foreach($playlist as $video){
	$query = $db->prepare('INSERT INTO schedule (channel, startTime, video) VALUES (:ch, :startTime, :video);');
	$query->bindValue(':ch', $_GET['ch'], SQLITE3_INTEGER);
	$query->bindValue(':startTime', $time, SQLITE3_INTEGER);
	$query->bindValue(':video', json_encode($video), SQLITE3_TEXT);
	$query->execute();

	$time += $video[3] - $video[2];
}