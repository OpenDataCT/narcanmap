

		
    //initialize the leaflet map, set options and view
    var map = L.map('map');

		L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

		}).addTo(map);

		function onLocationFound(e) {
			var radius = e.accuracy / 2;

			L.marker(e.latlng).addTo(map)
				.bindPopup("You are within " + radius + " meters from this point").openPopup();

			L.circle(e.latlng, radius).addTo(map);
		}

		function onLocationError(e) {
			alert(e.message);
		}

		map.on('locationfound', onLocationFound);
		map.on('locationerror', onLocationError);

		map.locate({setView: true, maxZoom: 16});
	
	//get narcan data via SODA
	var dataUrl ='https://data.ct.gov/resource/wzna-yuqm.geojson?'
	$.getJSON(dataUrl, function(data, textstatus) {
		$.each(data, function(i, entry) {

    L.geoJson(data).addTo(map)
		});
	});

