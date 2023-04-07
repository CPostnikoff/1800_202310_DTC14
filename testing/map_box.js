const list_of_maps = [[-123.113952, 49.2608724], [-123.137414, 49.163168]]
const bcit_coords = [-123.1153108, 49.2834212]

function get_directions_from_user_location() {
    navigator.geolocation.getCurrentPosition(user_position)
    function user_position(position) {
        user_location = [position.coords.longitude, position.coords.latitude]
        get_route_coordinates_then_draw_map([user_location, bcit_coords])
    }
}

function get_directional_map(user_location, coordinates) {
    // console.log(coordinates)
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2FtZXJvbmpwIiwiYSI6ImNsZXFxZ3EwaTBsYXgzeXFyMXU2bWc4YzAifQ.eCt8E49PH-tYQWbe9F6nCA';
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [user_location[0], user_location[1]],
        zoom: 14
    });

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
    map.addControl(new mapboxgl.NavigationControl())
}


function center_map(user_location) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2FtZXJvbmpwIiwiYSI6ImNsZXFxZ3EwaTBsYXgzeXFyMXU2bWc4YzAifQ.eCt8E49PH-tYQWbe9F6nCA';
    // console.log(user_location)
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [user_location[0], user_location[1]],
        zoom: 10
    });
}

function get_user_location() {
    navigator.geolocation.getCurrentPosition(user_position)
    function user_position(position) {
        user_latitude = position.coords.latitude
        user_longitude = position.coords.longitude
        center_map([user_longitude, user_latitude])
    }
}

function get_route_coordinates_then_draw_map(coordinates) {
    $.ajax({
        url: `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates[0]};${coordinates[1]}?geometries=geojson&access_token=pk.eyJ1IjoiY2FtZXJvbmpwIiwiYSI6ImNsZXFxZ3EwaTBsYXgzeXFyMXU2bWc4YzAifQ.eCt8E49PH-tYQWbe9F6nCA`,
        type: "GET",
        success: function (response) {
            // console.log(response)
            let user_route = response.routes[0].geometry.coordinates
            // console.log(user_route)
            get_directional_map(coordinates[0], user_route)
        }
    })
}

// https://api.mapbox.com/directions/v5/mapbox/driving/-123.113952,49.2608724;-123.137414,%2049.163168?geometries=geojson&access_token=pk.eyJ1IjoiY2FtZXJvbmpwIiwiYSI6ImNsZXFxZ3EwaTBsYXgzeXFyMXU2bWc4YzAifQ.eCt8E49PH-tYQWbe9F6nCA

// `https://api.mapbox.com/directions/v5/mapbox/driving/{destination_coordinates};{origin_coordinates}?geometries=geojson&access_token=pk.eyJ1IjoiY2FtZXJvbmpwIiwiYSI6ImNsZXFxZ3EwaTBsYXgzeXFyMXU2bWc4YzAifQ.eCt8E49PH-tYQWbe9F6nCA`

$(document).ready(function () {
    // add_route()
    // get_user_location()
    // var temp_coords = [[-123.113952, 49.2608724], [-123.137414, 49.163168]]
    // get_route_coordinates(temp_coords)
    get_directions_from_user_location()
})