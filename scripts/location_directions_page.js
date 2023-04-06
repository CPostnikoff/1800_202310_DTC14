function correctedTitle(title) {
    to_cap = title.split("_")
    for (i = 0; i < to_cap.length; i++) {
        to_cap[i] = to_cap[i].charAt(0).toUpperCase() + to_cap[i].slice(1);
    }
    final_title = to_cap.join(" ");
    return final_title
}

let destination_coordinates = 0

function displayLocationDetails() {

    let current_url_split = window.location.href.split("=")
    let current_location = current_url_split[1]

    console.log(current_location)

    db.collection("locations").doc(current_location).get()
        .then(current_location => {
            var title = correctedTitle(window.location.href.split("=")[1]);
            var details = current_location.data().description;
            destination_coordinates = current_location.data().location;
            document.querySelector('#location_name').innerHTML = title;
            document.querySelector('#location_description').innerHTML = details;
        })
}

displayLocationDetails("locations")

function updateTravelDetails(travel_distance, travel_duration) {
    console.log(travel_distance)
    console.log(travel_duration)
    let adjusted_distance = Math.round(travel_distance / 1000)
    let adjusted_duration = Math.round(travel_duration / 60)

    document.querySelector('#travel_distance').innerHTML = adjusted_distance + " Km";
    document.querySelector('#travel_time').innerHTML = adjusted_duration + " Minutes";
}


function get_directions_from_user_location() {
    navigator.geolocation.getCurrentPosition(user_position)
    function user_position(position) {
        user_location = [position.coords.longitude, position.coords.latitude]
        get_route_coordinates_then_draw_map([user_location, destination_coordinates])
    }
}

function get_directional_map(user_location, coordinates) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2FtZXJvbmpwIiwiYSI6ImNsZXFxZ3EwaTBsYXgzeXFyMXU2bWc4YzAifQ.eCt8E49PH-tYQWbe9F6nCA';
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [user_location[0], user_location[1]],
        zoom: 14
    });
    console.log(coordinates)
    final_location = coordinates.slice(-1)
    map.on('load', () => {
        map.addSource('route', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates':
                        coordinates
                }
            }
        });
        map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#888',
                'line-width': 8
            }
        });
    });
    const destination_marker = new mapboxgl.Marker()
        .setLngLat(final_location[0], final_location[1])
        .addTo(map);
    
    map.addControl(new mapboxgl.NavigationControl())
    map.addControl(new mapboxgl.GeolocateControl(({
        positionOptions: {
            trackUserLocation: true
        }
    })
    ))
}


function get_route_coordinates_then_draw_map(coordinates) {
    $.ajax({
        url: `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates[0]};${coordinates[1]}?geometries=geojson&access_token=pk.eyJ1IjoiY2FtZXJvbmpwIiwiYSI6ImNsZXFxZ3EwaTBsYXgzeXFyMXU2bWc4YzAifQ.eCt8E49PH-tYQWbe9F6nCA`,
        type: "GET",
        success: function (response) {
            distance = response.routes[0].distance
            duration = response.routes[0].duration
            updateTravelDetails(distance, duration)
            let user_route = response.routes[0].geometry.coordinates
            get_directional_map(coordinates[0], user_route)
        }
    })
}

get_directions_from_user_location()
