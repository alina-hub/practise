<?php
    $executionStartTime = microtime(true) / 1000;
	$str= file_get_contents("../../countryBorders.geo.json");
	$decode=json_decode($str, true);
	


	
	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	
	$output['data']= $decode;



	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output);
	
	
	


	/*ini_set('display_errors', 'On');
    error_reporting(E_ALL);
    $executionStartTime = microtime(true);

 

    $countryBorders = file_get_contents('../../countryBorders.geo.json');
    
    $name = json_decode($countryBorders,true);
	$code = json_decode($countryBorders,true);
    

    for ($i=0; $i < count($decode['features']); $i++) {

        if ($decode['features'][$i]['properties']['iso_a2'] == $_REQUEST['country']) {

            $selectedFeature = $decode['features'][$i]['geometry'];
        };
    };




    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['data'] = $selectedFeature ;

    

    header('Content-Type: application/json; charset=UTF-8');

 

    echo json_encode($output); 

 
*/
?>
