<?php

require 'config.php';
$db = new SQLite3($DATABASE);

$db->query('CREATE TABLE IF NOT EXISTS channels (
	id INTEGER PRIMARY KEY,
	name TEXT,
	playlist TEXT,
	shuffle INTEGER DEFAULT 0
)');

$db->query('CREATE TABLE IF NOT EXISTS schedule (
	channel INTEGER,
	startTime INTEGER,
	video TEXT
)');