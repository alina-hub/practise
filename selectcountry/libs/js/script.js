var mymap = L.map('mapid').setView([51.505, -0.09], 13);
var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
OpenStreetMap_Mapnik.addTo(mymap);

/*L.geoJSON(data, {
    style: function (feature) {
        return {color: feature.properties.color};
    }
}).bindPopup(function (layer) {
    return layer.feature.properties.description;
}).addTo(map);*/




//user geolocation:

var x = document.getElementById("myLocation");

function geoFindMe() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
    
  }
}

//select country

function basement(feature, layer){
  layer.bindPopup("<p id='countryname'>"+feature.properties.name+"</p><br><p id='iso'>"+feature.properties.iso_a2+"</p>");
};

L.geoJSON(mygeo,{
  onEachFeature: basement
}).addTo(mymap);

 
$('#countryselect').click(function() {
let country=$('#country').val();

  for (var i=0; i<feature.properties.length; i++) {
    $('#country').append($('<option>', {
        value: feature[i].properties.iso_a2
       
    }));

    const filterData = feature.properties.filter((a) => (a.properties.iso_a2 ===country));
    border = L.geoJSON(filterData[0]); 
    map.fitBounds(border.getBounds()).addTo(mymap);

   /*let country=$('#country').val();
   let iso=$('#iso').val();
   if(country === iso){
    mymap.fitBounds([
      [40.712, -74.227],
      [40.774, -74.125]
  ]);
   }*/
  }
});
  
  /*$.ajax({
    url: "libs/php/selectcountry.php",
    type: 'POST',
    dataType: 'json',
    
    success: function(result) {
     console.log(result);
    for (var i=0; i<result.data.border.features.length; i++) {
      let box='';
    if(country === result.data.border.features[i].properties.iso_a3){
     box += '<div>'+result.data.border.features[i].properties.iso_a3+'</div>';
    }
    
    $('#result').html(box);
    let myGeoJSON= result;

    L.geoJason(myGeoJSON).addTo(map);
    }
     if(map.hasLayer(border)) {
      map.removeLayer(border);
     }

     for (var i=0; i<result.data.border.features.length; i++) {
      $('#country').append($('<option>', {
          value: result.data.border.features[i].properties.iso_a3,
          text: result.data.border.features[i].properties.name,
      }));

      const filterData = result.data.border.features.filter((a) => (a.properties.iso_a3 ===country));
      border = L.geoJSON(filterData[0]); 
      map.fitBounds(border.getBounds()).addTo(map);
    }
    

    /*L.geoJSON(geojsonFeature).addTo(map);

     const filterData = result.data.border.features.filter((a) => (a.properties.iso_a3 ===country));
      border = L.geoJSON(filterData[0]); 
      map.fitBounds(border.getBounds());*/
      
             

      
    /*},
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
              console.log(textStatus);
              console.log(errorThrown);
    }
  }); 
	
});*/


//your location

function showPosition(position) {
let latitude=position.coords.latitude;
let longitude=position.coords.longitude;

  x.innerHTML = "Latitude: " + "<p id='lat'>"+latitude + "</p><br> Longitude: "+"<p id='lng'>"+ longitude+"</p>";
  
  mymap.panTo([latitude, longitude]);
  var marker = L.marker([latitude, longitude]).addTo(mymap);
 document.getElementById("lat").value= latitude;
 document.getElementById("lng").value= longitude;
  
}



//places of interest

$('#cbutton').click(function() {

        $.ajax({
            url: "libs/php/poi.php",
            type: 'POST',
            dataType: 'json',
            xhrFields: {
         withCredentials: false
    },
            data: {
                lat: $('#lat').val(),
                lng: $('#lng').val()
                
            },
            success: function(result) {
    
                console.log(JSON.stringify(result));
                //$('#res').removeClass('d-none');
                
                if (result.status.name == "ok") {
                    let boxthree = '';
                    
                    $('#c').html('').css("display", "flex");
    
                    if(result.data.length >1){
                      for(i=0; i< result.data.length; i++){
                    
                       boxthree += "<div class='card-group'>"+"<div class= 'card'>"+"<div class='card-header'> Class: "+ result.data[i].typeClass + "</div>"+"<br\>"+ "<div class='card-body'>"+"Name: "+ result.data[i].name +"<br\>"+"Type: "+result.data[i].typeName+
                      "<br\>"+ "Longitude: "+ result.data[i].lng+"<br\>"+"Latitude: "+ result.data[i].lat+"<br\><br\><br\><br\></div>"+"</div>"+"</div>";
                      }
                    }
                    else if(result.data.length == 1){
                        boxthree += "<div class='card-group'>"+"<div class= 'card'>"+"<div class='card-header'> Class: "+ result.data[0].typeClass + "</div>"+"<br\>"+ "<div class='card-body'>"+"Name: "+ result.data[0].name +"<br\>"+"Type: "+result.data[0].typeName+
                      "<br\>"+ "Longitude: "+ result.data[0].lng+"<br\>"+"Latitude: "+ result.data[0].lat+"<br\><br\><br\><br\></div>"+"</div>"+"</div>";
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
        //$("#north").val('');
        //$("#south").val('');
        //$("#east").val('');
       // $("#west").val('');
       // $('#c').html('').css("display", "none");
     });



// oceans

$('#dbutton').click(function() {

        $.ajax({
            url: "libs/php/nearby.php",
            type: 'POST',
            dataType: 'json',
            data: {
                lat: $('#lat').val(),
                lng: $('#lng').val()
                
            },
    
            
    
            success: function(result) {
    
                console.log(JSON.stringify(result));
               // $('#res').removeClass('d-none');

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
    
// weather    
$('#abutton').click(function() {

        $.ajax({
            url: "libs/php/weather.php",
            type: 'POST',
            dataType: 'json',
            data: {
                lat: $('#lat').val(),
                lng: $('#lng').val()
            },
            success: function(result) {
    
                console.log(JSON.stringify(result));
                //$('#res').removeClass('d-none');
                
                if (result.status.name == "ok") {
                    let boxone = '';
                    
                    $('#a').html('').css("display", "flex");

                    if(result.data == 'invalid input'){
                    boxone+="<div class='card-body'>There is no data on your input</div>";
                  }
                  else {
    
                   /* //if(result.data.length >1){
                      for(i=0; i< result.data.length; i++){
                    
                       boxone += "<div class='card-group'>"+"<div class= 'card'>"+"<div class='card-header'> Station name: "+ result.data[i].stationName + "</div>"+"<br\>"+ "<div class='card-body'>"+"Date and time: "+ result.data[i].datetime +"<br\>"+"Clouds: "+result.data[i].clouds+
                      "<br\>"+ "Temperature: "+ result.data[i].temperature+"<br\>"+"Humidity: "+ result.data[i].humidity+"<br\>"+"Weather condition: "+
                       result.data[i].weatherCondition+ "<br\>"+ "Wind direction: "+ result.data[i].windDirection+ "<br\>"+ "Wind speed: "+ 
                       result.data[i].windSpeed+ "<br\>"+ "Station longitude: "+ Math.round(result.data[i].lng *100)/100 + "<br\>"+ "Station latitude: "+ Math.round(result.data[i].lat *100)/100+"<br\><br\><br\></div>"+"</div>"+"</div>";
                      }
                  
                   }
                    else if(result.data.length == 1){
                      */
                        boxone += "<div class='card-header'>"+ "Station name: "+ result.data.stationName + "</div>"+"<br\>"+"<div class='card-body'>"+ "Date and time: "+ result.data.datetime +'<br\>'+"Clouds: "+result.data.clouds+
                        "<br\>"+ "Temperature: "+ result.data.temperature+"<br\>"+"Humidity: "+ result.data.humidity+"<br\>"+"Weather condition: "+
                         result.data.weatherCondition+ "<br\>"+ "Wind direction: "+ result.data.windDirection+ "<br\>"+ "Wind speed: "+ 
                         result.data.windSpeed+ "<br\>"+ "Station longitude: "+ Math.round(result.data.lng *100)/100 + "<br\>"+ "Station latitude: "+ Math.round(result.data.lat *100)/100+"<br\><br\><br\>"+"</div>";
        /*
                    }
                    else{
                        boxone+="<div class='card-body'> No data on your request</div>";
                    }
                  */
                  }
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
        $("#north").val('');
        $("#south").val('');
        $("#east").val('');
        $("#west").val('');
        $('#a').html('').css("display", "none");
     });
    














/*function geoFindMe() {

  const status = document.querySelector('#myLocation');
  //const mapLink = document.querySelector('#mapid');

 // mapLink.href = '';
 // mapLink.textContent = '';

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude);
    console.log("longitude: "+ longitude);

   // status.textContent = '';
    //mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if(!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}
*/




//document.querySelector('#loc').addEventListener('click', geoFindMe);

/*let output = document.getElementById("myLocation");
function showPosition(){
  
        output.innerHTML = "Latitude: " + position.coords.latitude + 
        "<br>Longitude: " + position.coords.longitude;
      
}

function geoFindMe(){
 

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    output.innerHTML = "Geolocation is not supported by this browser.";
  }
}
*/
