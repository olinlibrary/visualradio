<?php

require 'config.php';
$db = new SQLite3($DATABASE);

$db->query('DELETE FROM channels');
$db->query('DELETE FROM schedule');

$db->query('INSERT INTO channels (name, playlist, shuffle) VALUES ("Slow TV", "[
	[""yt"",""831Drz4YQdQ"",180,32400],
	[""yt"",""jMTTNpZWiKw"",0,21600],
	[""yt"",""aLQeqyOK4lE"",0,3600],
	[""yt"",""R5c2jXVkpGg"",340,5400],
	[""yt"",""pirv3EzznR8"",720,19586]
]", 1)');

$db->query('INSERT INTO channels (name, playlist, shuffle) VALUES ("Impossible View", "[
	[""yt"",""H5jHLv_TUEY"",7,100],
	[""yt"",""Ip77GoiF7f8"",240,3600],
	[""yt"",""0fKBhvDjuy0"",33,510],
	[""yt"",""XG90YYHCSeA"",15,1500],
	[""yt"",""a7s8vnuknPY"",2,620]
]", 1)');

$db->query('INSERT INTO channels (name, playlist, shuffle) VALUES ("Action Sports", "[
	[""yt"",""NhPqn7MuDy0"",0,160],
	[""yt"",""KSwBT6QRUjA"",12,150],
	[""yt"",""xQ_IQS3VKjA"",30,390]
]", 1)');

$db->query('INSERT INTO channels (name, playlist) VALUES ("Trippy", "[
	[""yt"",""wycjnCCgUes"",7,115],
	[""yt"",""w6K0iDsu0TM"",15,300],
	[""yt"",""5Z8oYH_bhnA"",2,165]
]")');