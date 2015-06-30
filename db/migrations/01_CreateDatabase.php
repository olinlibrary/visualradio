<?php
$f3=require('../../lib-fatfree/base.php');
$db = new DB\SQL('sqlite:../visualradio.db');

$db->exec('CREATE TABLE IF NOT EXISTS channels (
	id INTEGER PRIMARY KEY,
	name TEXT,
	hours REAL DEFAULT(0),
    live  TEXT DEFAULT(0)
)');

$db->exec('CREATE TABLE IF NOT EXISTS videos (
	id INTEGER PRIMARY KEY,
	channel INTEGER NOT NULL,
	youtubeID TEXT CONSTRAINT youtubeIDLength CHECK (length(youtubeID) = 11) NOT NULL,
	startTime INTEGER,
	endTime INTEGER,
	CONSTRAINT uniqueInChannel UNIQUE (channel, youtubeID) ON CONFLICT REPLACE
)');

$db->exec('CREATE TABLE IF NOT EXISTS schedule (
	id INTEGER PRIMARY KEY,
	channel INTEGER NOT NULL,
	startTime INTEGER NOT NULL,
	endTime INTEGER NOT NULL,
	video INTEGER NOT NULL
)');