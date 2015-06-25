<?php

require 'config.php';

if(!isset($_GET['ch'])){
	http_response_code(403);
	die('No Channel Specified');
}

// Get Current Entry in Schedule
$db = new SQLite3($DATABASE);
getSchedule:
	$query = $db->prepare('SELECT video,startTime FROM schedule WHERE startTime <= :time AND channel = :ch ORDER BY startTime DESC');
	$query->bindValue(':ch', $_GET['ch'], SQLITE3_INTEGER);
	$query->bindValue(':time', time(), SQLITE3_INTEGER);
	$result = $query->execute()->fetchArray(SQLITE3_ASSOC);

// If Schedule Not Present, Regenerate
if(!$result){
	require 'schedule.php';
	goto getSchedule;
}

// Calculate Video Time
$status = json_decode($result['video']);
$videoTime = $status[2] + time() - $result['startTime'];

// If End of Schedule, Regenerate
if($videoTime >= $status[3]){
	require 'schedule.php';
	goto getSchedule;
}

// Calculate Current Time
$status[2] = $videoTime;
unset($status[3]);
print_r(json_encode($status));