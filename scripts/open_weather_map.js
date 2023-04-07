// Get user location via navigator.geolocation
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


// Read the weather data from the API and execute the functions to populate the fields
function get_weather(lat, lon) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=bddff69086f7c97eba94d171cbf10caa&units=metric`,
        type: 'GET',
        success: function (data) {
            getNextFiveDatesAndDocs(data);
            populate_fields(data);
        }
    })
}


// Generates the date for the next 5 days and finds the document containing the specific date at 12:00:00
// This is done because the API returns data every 3 hours, so we need to find the document containing the date at 12:00:00
// Documents are stored in another variable
// :param data: The data from the API
function getNextFiveDatesAndDocs(data) {
        // Create a unique variable for the next 5 days
        const today = new Date();
        var dayOne = today.getDate() +1;
        var dayTwo = today.getDate() +2;
        var dayThree = today.getDate() +3;
        var dayFour = today.getDate() +4;
        var dayFive = today.getDate() + 5;
    
        // Find the document containing the date for the next 5 days
        dateFormatToday = data.list[0].dt_txt.split(' ')[0];
        dayOneDocument = findDocOfDate(data, replaceDay(dateFormatToday, dayOne) + ' 12:00:00');
        dayTwoDocument = findDocOfDate(data, replaceDay(dateFormatToday, dayTwo) + ' 12:00:00');
        dayThreeDocument = findDocOfDate(data, replaceDay(dateFormatToday, dayThree) + ' 12:00:00');
        dayFourDocument = findDocOfDate(data, replaceDay(dateFormatToday, dayFour) + ' 12:00:00');
        dayFiveDocument = findDocOfDate(data, replaceDay(dateFormatToday, dayFive) + ' 12:00:00');
}


// Populate the fields with the data from the API
// :param data: The data from the API
function populate_fields(data) {
    // Populate user city, current weather, rain chance, and wind speed
    document.getElementById('city').innerHTML = data.city.name;
    document.getElementById('temp').innerHTML = Math.round(data.list[0].main.temp) + ' °C';
    document.getElementById('rain-chance').innerHTML = Math.round((data.list[0].pop * 100)) + ' %';
    document.getElementById('wind-speed').innerHTML = data.list[0].wind.speed + ' m/s';

    // Populate the details for the next 5 days
    $('#extraDayOne').html(dayOneDocument.dt_txt.split(' ')[0].slice(5));
    $('#extraDayTwo').html(dayTwoDocument.dt_txt.split(' ')[0].slice(5));
    $('#extraDayThree').html(dayThreeDocument.dt_txt.split(' ')[0].slice(5));
    $('#extraDayFour').html(dayFourDocument.dt_txt.split(' ')[0].slice(5));
    $('#extraDayFive').html(dayFiveDocument.dt_txt.split(' ')[0].slice(5));

    // Populate the temperature for the next 5 days
    $('#dayOneTemp').html(Math.round(dayOneDocument.main.temp) + ' °C');
    $('#dayTwoTemp').html(Math.round(dayTwoDocument.main.temp) + ' °C');
    $('#dayThreeTemp').html(Math.round(dayThreeDocument.main.temp) + ' °C');
    $('#dayFourTemp').html(Math.round(dayFourDocument.main.temp) + ' °C');
    $('#dayFiveTemp').html(Math.round(dayFiveDocument.main.temp) + ' °C');

    // Replace weather with icon
    $('#currentWeather').html(replaceWeatherWithIcon(data.list[0].weather[0].main, '#currentWeather'));
    $('#dayOneWeather').html(replaceWeatherWithIcon(dayOneDocument.weather[0].main, '#dayOneWeather'));
    $('#dayTwoWeather').html(replaceWeatherWithIcon(dayTwoDocument.weather[0].main, '#dayTwoWeather'));
    $('#dayThreeWeather').html(replaceWeatherWithIcon(dayThreeDocument.weather[0].main, '#dayThreeWeather'));
    $('#dayFourWeather').html(replaceWeatherWithIcon(dayFourDocument.weather[0].main, '#dayFourWeather'));
    $('#dayFiveWeather').html(replaceWeatherWithIcon(dayFiveDocument.weather[0].main, '#dayFiveWeather'));
}


// Iterate an entireFind the document containing the listed date within a collection
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

// Replace retreived weather description with an icon
// :param weatherDescription: The weather description to replace retreived from the API
// :param elementID: The ID of the element to replace
function replaceWeatherWithIcon(weatherDescription, elementID) {
    if (weatherDescription === 'Clouds') {
        $(elementID).replaceWith('<span class="material-symbols-outlined">cloudy</span>');
    } else if (weatherDescription === 'Rain') {
        $(elementID).replaceWith('<span class="material-symbols-outlined">rainy</span>');
    } else if (weatherDescription === 'Clear') {
        $(elementID).replaceWith('<span class="material-symbols-outlined">sunny</span>');
    } else if (weatherDescription === 'Snow') {
        $(elementID).replaceWith('<span class="material-symbols-outlined">snowy</span>');
    } else if (weatherDescription === 'Thunderstorm') {
        $(elementID).replaceWith('<span class="material-symbols-outlined">thunderstorm</span>');
    } else if (weatherDescription === 'Drizzle') {
        $(elementID).replaceWith('<span class="material-symbols-outlined">drizzle</span>');
    } else {
        $(elementID).replaceWith("<p>'N/A'</p>");
    }
}

// Execute functions in this file upon sucessfully loading the page
$(document).ready(function () {
    get_user_location()
})