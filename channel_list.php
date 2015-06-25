<?php

require 'config.php';
$db = new SQLite3($DATABASE);

$channels = array();
$result = $db->query('SELECT id FROM channels');
while($row = $result->fetchArray(SQLITE3_ASSOC))
	array_push($channels,$row['id']);
echo 'channelList = '.json_encode($channels).';';