


<<<<<<< HEAD

=======
>>>>>>> origin/master
		
    //initialize the leaflet map, set options and view
    var map = L.map('map');

		L.tileLayer('https://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'

		}).addTo(map);

	

	function onLocationFound(e) {
			var radius = e.accuracy / 2;
			
			L.circleMarker(e.latlng).addTo(map)
				.bindPopup("You are here").openPopup();
			
			
			//L.circle(e.latlng, radius).addTo(map);
		}

		function onLocationError(e) {
			alert(e.message);
		}

		map.on('locationfound', onLocationFound);
		map.on('locationerror', onLocationError);

		map.locate({setView: true, maxZoom: 12});


<<<<<<< HEAD
	var dataUrl ="https://data.ct.gov/resource/4vs4-3cb3.geojson?&$$app_token=XLuaA9ORBAtEbSAgAs4VIO8SK"
=======
	var dataUrl ="https://data.ct.gov/resource/wzna-yuqm.geojson?&$$app_token=XLuaA9ORBAtEbSAgAs4VIO8SK"
>>>>>>> origin/master

	$.getJSON(dataUrl, function(data, textstatus) {
		$.each(data, function(i, entry) {
		
    L.geoJson(data, {
		onEachFeature: function (feature, layer) {
<<<<<<< HEAD
		layer.bindPopup ('<h4>' + feature.properties.pharmacy_name + '</h4>' + '<br>' + feature.properties.phone + '</br>' + '<br>' + feature.properties.location_1_address + '</br>' 
		 + feature.properties.location_1_city + '</br>' + feature.properties.location_1_zip)}
=======
		layer.bindPopup ('<h4>' + feature.properties.pharmacy + '</h4>' + '</br>' + feature.properties.address + '</br>' + feature.properties.phone)}
>>>>>>> origin/master
	}).addTo(map)
		
		});
	});

<<<<<<< HEAD

=======
>>>>>>> origin/master
