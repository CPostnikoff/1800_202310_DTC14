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
        url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=bddff69086f7c97eba94d171cbf10caa&units=metric`,
        type: 'GET',
        success: function (data) {
            console.log(data)
            populate_fields(data)
        }
    })
}

function populate_fields(data) {
    document.getElementById('city').innerHTML = data.city.name;
    document.getElementById('temp').innerHTML = Math.round(data.list[0].main.temp) + ' °C';
    document.getElementById('rain-chance').innerHTML = (data.list[0].pop * 100) + ' %';
    document.getElementById('wind-speed').innerHTML = data.list[0].wind.speed + ' m/s';
    dateFormatToday = data.list[0].dt_txt.  split(' ')[0];


    // Populate details for the next 5 days
    
    // Get the date for the next 5 days
    const today = new Date();
    var dayOne = today.getDate() +1;
    var dayTwo = today.getDate() +2;
    var dayThree = today.getDate() +3;
    var dayFour = today.getDate() +4;
    var dayFive = today.getDate() + 5;

    // Find the document containing the date for the next 5 days
    dayOneArray = findDocOfDate(data, replaceDay(dateFormatToday, dayOne) + ' 12:00:00');
    dayTwoArray = findDocOfDate(data, replaceDay(dateFormatToday, dayTwo) + ' 12:00:00');
    dayThreeArray = findDocOfDate(data, replaceDay(dateFormatToday, dayThree) + ' 12:00:00');
    dayFourArray = findDocOfDate(data, replaceDay(dateFormatToday, dayFour) + ' 12:00:00');
    dayFiveArray = findDocOfDate(data, replaceDay(dateFormatToday, dayFive) + ' 12:00:00');

    // Populate the details for the next 5 days
    $('#extraDayOne').html(dayOneArray.dt_txt.split(' ')[0].slice(5));
    $('#extraDayTwo').html(dayTwoArray.dt_txt.split(' ')[0].slice(5));
    $('#extraDayThree').html(dayThreeArray.dt_txt.split(' ')[0].slice(5));
    $('#extraDayFour').html(dayFourArray.dt_txt.split(' ')[0].slice(5));
    $('#extraDayFive').html(dayFiveArray.dt_txt.split(' ')[0].slice(5));

    // Populate the temperature for the next 5 days
    $('#dayOneTemp').html(Math.round(dayOneArray.main.temp) + ' °C');
    $('#dayTwoTemp').html(Math.round(dayTwoArray.main.temp) + ' °C');
    $('#dayThreeTemp').html(Math.round(dayThreeArray.main.temp) + ' °C');
    $('#dayFourTemp').html(Math.round(dayFourArray.main.temp) + ' °C');
    $('#dayFiveTemp').html(Math.round(dayFiveArray.main.temp) + ' °C');
}

// Find the document containing the listed date within a collection
// :param dateText: The date to search for, in the format YYYY-MM-DD HH:MM:SS
function findDocOfDate(data, dateText) {
    for (let i = 0; i < data.list.length; i++) {
      if (data.list[i].dt_txt === dateText) {
        // console.log(data.list[i])
        return data.list[i];
      }
    }
}

// Update the date to a different day
// :param today: The date to update, in the format YYYY-MM-DD
// :param newDate: The new date, in the format DD
function replaceDay(today, newDate) {
    if (newDate <= 9) {
        return today.slice(0, -1) + newDate
    } else {
        return today.slice(0, -2) + newDate
    }
}

$(document).ready(function () {
    get_user_location()
})