function get_user_location() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(user_position);
    } else {
        console.log("Cannot get user location.");
    }

    function user_position(position) {
        user_latitude = position.coords.latitude
        user_longitude = position.coords.longitude
        get_weather(user_latitude, user_longitude)
    }
}

function get_weather(lat, lon) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bddff69086f7c97eba94d171cbf10caa&units=metric`,
        type: 'GET',
        success: function (data) {
            populate_fields(data)
        }
    })
}

function populate_fields(data) {
    document.getElementById('city').innerHTML = data.name
    document.getElementById('temp').innerHTML = Math.round(data.main.temp) + ' °C'
    document.getElementById('humidity').innerHTML = data.main.humidity + ' % Humidity'
}

$(document).ready(function () {
    get_user_location()
})