<?php
	$id = $_REQUEST['id'];
	
	$data = file_get_contents('bigdata.json');

	$data = json_decode($data);

	echo json_encode($data[$id]);
