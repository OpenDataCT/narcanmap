
$(document).ready(function () {
    var mapnarcan;
    //initialize the leaflet map, set options and view
    var map = L.map('map');

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'mapbox.streets'
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

    //call our getData() function.
    getData();

    //define a base icon
    var baseIcon = L.Icon.extend({
        options: {
            shadowUrl: 'img/shadow.png',

            iconSize: [32, 37], // size of the icon
            shadowSize: [51, 37], // size of the shadow
            iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
            shadowAnchor: [25, 37],  // the same for the shadow
            popupAnchor: [1, -37] // point from which the popup should open relative to the iconAnchor
        }
    });

   

    function getData() {
        
        $.getJSON(constructQuery(sodaQuery), function (data) {

                console.log(data)
			    //iterate over each 311 complaint, add a marker to the map
			    for (var i = 0; i < data.length; i++) {

			        var marker = data[i];
			        var icon = getIcon(baseIcon);

			        var markerItem = L.marker([marker.location.latitude, marker.location.longitude], { icon: icon });
			        markerItem.bindPopup(
							'<h4>' + marker.pharmacy + '</h4>'
							+ ((marker.address) ? '<br/>' + marker.email_fax_other : '')
						);
			        markers.addLayer(markerItem);
			    }
            //.addTo(map);
			    map.addLayer(markers);

			})
    }

    function constructQuery(sodaQuery) {
        var originalstr = "https://data.ct.gov/resource/wzna-yuqm.json?$select=*,DISTANCE_IN_METERS(location,'POINT(location.latitude,location.longitude)AS distance_in_meters&$limit=5&$order=distance_in_meters asc,pharmacy,address,email_fax_other>'"

        return originalstr;
    }
    

    map.on('dragend', function (e) {
        getData();
    });

    $('#nycAgency').on("change", function () {
        getData();
    });

    $("#conditions_list").on('change keyup paste', function () {
        getData();
    });
});
