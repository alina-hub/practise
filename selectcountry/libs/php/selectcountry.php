<?php
    $executionStartTime = microtime(true) / 1000;
	$str= file_get_contents("../../countryBorders.js");
	//$border=json_decode($str, true);
	//$countryInfo=json_decode($str, true);
	$decode = json_decode($str,true);
	
	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	//$output['data']['border']= $border;
	//$output['data']['countryInfo']= $countryInfo;

	$output['data']=$decode['mygeo'];

	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output);
	
	
	

?>
