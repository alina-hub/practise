$(window).on('load', function () {
    if ($('#preloader').length) {
    $('#preloader').delay(100).fadeOut('slow', function () {
    $(this).remove();
    });
    }

	/*$("#country").val('GB');
    $('#a').html('').css("display", "none");
    $("#placeInput").val('GB');
    $("#postalcodeInput").val('SW1P 3PA');
    $('#b').html('').css("display", "none");
    $("#north").val('59');
    $("#south").val('49');
    $("#east").val('1');
    $("#west").val('-8');
    $('#c').html('').css("display", "none");
    $('#lat').val(53);
    $('#lng').val(1);
    $('#d').html('').css("display", "none");
*/});


/*$('#abutton').click(function() {

		$.ajax({
			url: "libs/php/country.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: $('#country').val()
				
			},
			success: function(result) {

				console.log(JSON.stringify(result));
                $('#res').removeClass('d-none');


				if (result.status.name == "ok") {
					let boxone='';
                    $('#a').html('').css("display", "flex");
					boxone += "<div class= 'card-header'>"+ "Country: "+ result.data[0].countryName + "</div>"+"<br\>"+ "<div class='card-body'>"+"Capital: "+ result.data[0].capital +"<br\>"+"Population: "+result.data[0].population+
                    "<br\>"+ "Languages: "+ result.data[0].languages+"<br\>"+"Area: "+ result.data[0].areaInSqKm+"<br\>"+"Continent: "+
                    result.data[0].continentName+ "<br\>"+ "North: "+ Math.round(result.data[0].north * 100)/100+ "<br\>"+ "South: "+ 
                    Math.round(result.data[0].south *100)/100+ "<br\>"+ "East: "+ Math.round(result.data[0].east *100)/100 + "<br\>"+ "West: "+ Math.round(result.data[0].west * 100)/100+"</div>";

                    $('#a').html(boxone);
				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
      	        console.log(textStatus);
      	        console.log(errorThrown);
			}
		}); 
	
	});
$('#aresetbutton').click(function() {
		$("#country").val('');
		$('#a').html('').css("display", "none");
	
	});

$('#bbutton').click(function() {

        $.ajax({
            url: "libs/php/postalcode.php",
            type: 'POST',
            dataType: 'json',
            data: {
                country: $('#placeInput').val(),
                postalcode: $('#postalcodeInput').val()
                
            },
            success: function(result) {
    
                console.log(JSON.stringify(result));
                $('#res').removeClass('d-none');

                if (result.status.name == "ok") {
                  let boxtwo  = '';
                  
                  $('#b').html('').css("display", "flex");
                  
                  if(result.data.length > 1){
                    for(i=0;i< result.data.length;i++){
                      boxtwo += "<div class='card-header'> City: " + result.data[i].placeName + "</div>"+"<br> " +"<div class='card-body'>"+"District: "+ result.data[i].adminName3 + "<br>" +"Administrative name: " + result.data[i].adminName2 + "<br>" + "Administrative name: "+ result.data[i].adminName3  +"</div>";
                      
                    }
                  }
    
                  else if(result.data.length == 1){
                    
                    boxtwo += "<div class='card-header'>"+ "City: " + result.data[0].placeName + "</div>"+"<br> " +"<div class='card-body'>"+"District: "+ result.data[0].adminName3 + "<br>" +"Administrative name: " + result.data[0].adminName2 + "<br>" + "Administrative name: "+ result.data[0].adminName3  +"</div>";
                    
                  } 
                  else {
                   
                    boxtwo += "<div class='secondbox'> No data on your request </div>";
    
                  }
               
              
                  $('#b').html(boxtwo);
                }
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        }); 
    
    });
    
$('#bresetbutton').click(function() {
      $("#placeInput").val('');
      $("#postalcodeInput").val('');
      $('#b').html('').css("display", "none");
    });

$('#cbutton').click(function() {

        $.ajax({
            url: "libs/php/weather.php",
            type: 'POST',
            dataType: 'json',
            data: {
                north: $('#north').val(),
                south: $('#south').val(),
                east: $('#east').val(),
                west: $('#west').val()
            },
            success: function(result) {
    
                console.log(JSON.stringify(result));
                $('#res').removeClass('d-none');
                
                if (result.status.name == "ok") {
                    let boxthree = '';
                    
                    $('#c').html('').css("display", "flex");
    
                    if(result.data.length >1){
                      for(i=0; i< result.data.length; i++){
                    
                       boxthree += "<div class='card-group'>"+"<div class= 'card'>"+"<div class='card-header'> Station name: "+ result.data[i].stationName + "</div>"+"<br\>"+ "<div class='card-body'>"+"Date and time: "+ result.data[i].datetime +"<br\>"+"Clouds: "+result.data[i].clouds+
                      "<br\>"+ "Temperature: "+ result.data[i].temperature+"<br\>"+"Humidity: "+ result.data[i].humidity+"<br\>"+"Weather condition: "+
                       result.data[i].weatherCondition+ "<br\>"+ "Wind direction: "+ result.data[i].windDirection+ "<br\>"+ "Wind speed: "+ 
                       result.data[i].windSpeed+ "<br\>"+ "Station longitude: "+ Math.round(result.data[i].lng *100)/100 + "<br\>"+ "Station latitude: "+ Math.round(result.data[i].lat *100)/100+"<br\><br\><br\></div>"+"</div>"+"</div>";
                      }
                    }
                    else if(result.data.length == 1){
                        boxthree += "<div class='card-header'>"+ "Station name: "+ result.data[0].stationName + "</div>"+"<br\>"+"<div class='card-body'>"+ "Date and time: "+ result.data[0].datetime +'<br\>'+"Clouds: "+result.data[0].clouds+
                        "<br\>"+ "Temperature: "+ result.data[0].temperature+"<br\>"+"Humidity: "+ result.data[0].humidity+"<br\>"+"Weather condition: "+
                         result.data[0].weatherCondition+ "<br\>"+ "Wind direction: "+ result.data[0].windDirection+ "<br\>"+ "Wind speed: "+ 
                         result.data[0].windSpeed+ "<br\>"+ "Station longitude: "+ Math.round(result.data[0].lng *100)/100 + "<br\>"+ "Station latitude: "+ Math.round(result.data[0].lat *100)/100+"<br\><br\><br\>"+"</div>";
        
                    }
                    else{
                        boxthree+="<div class='card-body'> No data on your request</div>";
                    }
    
                  
                    $('#c').html(boxthree);
    
                }
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        }); 
    
    });
$('#cresetbutton').click(function() {
        $("#north").val('');
        $("#south").val('');
        $("#east").val('');
        $("#west").val('');
        $('#c').html('').css("display", "none");
     });
    
$('#dbutton').click(function() {

        $.ajax({
            url: "libs/php/nearby.php",
            type: 'POST',
            dataType: 'json',
            data: {
                lat: $('#lat').val(),
                lng: $('#lng').val(),
                
            },
    
            
    
            success: function(result) {
    
                console.log(JSON.stringify(result));
                $('#res').removeClass('d-none');

                if (result.status.name == "ok") {
                  let boxfour = '';
                  $('#d').html('').css("display", "flex");
    
                  if(result.data == 'invalid input'){
                    boxfour+="<div class='card-body'>There is no data on your input</div>";
                  }
                  else {
             
                    boxfour+="<div class='card-header'>"+"Name: "+ result.data.name +"</div>"+"</br>"+"<div class='card-body'>"+"GeonameId: "+result.data.geonameId+ "</br>Distance: "+result.data.distance+"</div>";  
                  } 
                  $('#d').html(boxfour);
    
                } 
                
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        }); 
    
    });
    
$('#dresetbutton').click(function() {
        $("#lat").val('');
        $("#lng").val('');   
        $('#d').html('').css("display", "none");
    });
    
      
    
    */
    
