<?php
	
	$key_input = $_GET['key_input'];

	$key_upper = strtoupper($key_input);

	$key01_output = $key_upper;
	$key02_output = str_replace(" ", "_", $key_upper);
	$key03_output = "<s:property value=\"getText('$key02_output')\" />";

	$data = array(
		"key01_output" => $key01_output,
		"key02_output" => $key02_output,
		"key03_output" => $key03_output,
	);

	echo json_encode($data); exit();

