<?php
	$pdo = new PDO('mysql:dbname=engineroom;host=127.0.0.1;charset=utf8', 'admin', 'Nrh23524280');
	$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>