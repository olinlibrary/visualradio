<?php
require 'config.php';

for($i=0; $i<$CHANNEL_COUNT; $i++){
	$db = new SQLite3('ch'.$i.'.db');
	$db->query('CREATE TABLE  IF NOT EXISTS `videos` (`id` VARCHAR(255) NOT NULL, `source` VARCHAR(255) NOT NULL , `sourceID` VARCHAR(255) NOT NULL , `startTime` INT(32) NOT NULL , `endTime` INT(32) NOT NULL , PRIMARY KEY (`id`))');
	$db->query('CREATE TABLE IF NOT EXISTS `schedule` (`id` VARCHAR(255) NOT NULL , `startTime` INT(32) NOT NULL)');

}

// Channel One Videos
$db = new SQLite3('ch0.db');
$db->query('DELETE FROM videos');
$db->query("INSERT INTO `videos` (`id`, `source`, `sourceID`, `startTime`, `endTime`) VALUES ('0', 'youtube', '831Drz4YQdQ', 180, 32400);");
$db->query("INSERT INTO `videos` (`id`, `source`, `sourceID`, `startTime`, `endTime`) VALUES ('1', 'youtube', 'jMTTNpZWiKw', 0, 21600);");

// Channel Two Videos
$db = new SQLite3('ch1.db');
$db->query('DELETE FROM videos');
$db->query("INSERT INTO `videos` (`id`, `source`, `sourceID`, `startTime`, `endTime`) VALUES ('1', 'youtube', 'NhPqn7MuDy0', '0', '200');");
$db->query("INSERT INTO `videos` (`id`, `source`, `sourceID`, `startTime`, `endTime`) VALUES ('2', 'youtube', 'H5jHLv_TUEY', '7', '100');");
$db->query("INSERT INTO `videos` (`id`, `source`, `sourceID`, `startTime`, `endTime`) VALUES ('3', 'youtube', 'KSwBT6QRUjA', '12', '150');");

// Channel Three Videos
$db = new SQLite3('ch2.db');
$db->query('DELETE FROM videos');
$db->query("INSERT INTO `videos` (`id`, `source`, `sourceID`, `startTime`, `endTime`) VALUES ('3', 'youtube', 'wycjnCCgUes', '7', '115');");

?>