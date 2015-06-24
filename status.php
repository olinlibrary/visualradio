<?php

require 'config.php';
if(!isset($_GET['ch'])) die('No Channel Specified');
$ch = (int)$_GET['ch'];
if($ch >= $CHANNEL_COUNT || $ch < 0) die('Invalid Channel');

$db = new SQLite3('ch'.$ch.'.db');

// Get Current Entry in Schedule
$statement = $db->prepare('SELECT videos.source,videos.sourceID,schedule.startTime,videos.startTime FROM schedule LEFT JOIN videos on schedule.id = videos.id WHERE schedule.startTime <= :time ORDER BY schedule.startTime DESC');
$statement->bindValue(':time', time(), SQLITE3_INTEGER);
$results = $statement->execute();


// If Schedule Needs to be Regenerated
$result = $results->fetchArray(SQLITE3_NUM);
if(!$result)
	die('No Schedule Present');

// Calculate Current Time
$result[2] = time() - $result[2] + $result[3];
unset($result[3]);
print_r(json_encode($result));