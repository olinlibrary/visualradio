<?php

require 'config.php';
if(!isset($_GET['ch'])) die('No Channel Specified');
$ch = (int)$_GET['ch'];
if($ch >= $CHANNEL_COUNT || $ch < 0) die('Invalid Channel');

$videos = array();
$time = time();
srand('ch'.$ch.$time);

// Get Array of Videos
$db = new SQLite3('ch'.$ch.'.db');
$results = $db->query('SELECT `id`,`startTime`,`endTime` FROM videos');
while($row = $results->fetchArray(SQLITE3_ASSOC))
	array_push($videos, $row);

// Clear Existing Schedule
$db->query('DELETE FROM schedule');

// Generate 1 Week Long Schedule
$lastVideo = $videos[0]['id'];
$targetLength = $time + 60*60*24*7;
while($time < $targetLength){

	// Shuffle Array
	while($videos[0]['id'] != $lastVideo)
		shuffle($videos);

	// Build Schedule
	foreach($videos as $vid){
		$statement = $db->prepare('INSERT INTO `schedule` VALUES (:id, :startTime);');
		$statement->bindValue(':id', $vid['id'], SQLITE3_INTEGER);
		$statement->bindValue(':startTime', $time, SQLITE3_INTEGER);
		$statement->execute();

		$time += $vid['endTime'] - $vid['startTime'];
	}

	$lastVideo = $vid['id'];
}