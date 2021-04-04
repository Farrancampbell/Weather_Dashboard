var searchForm = $('#search-form');
var searchTermEl = $('#search-term');
//This is the section where I ma put my current weather
var cityDateEl = $('#city-date');
var currentDate = moment().format('MM/DD/YYYY');
var forecastEl = $('#forecast');

var apiKey = '3cedb9cbd39b61d549cab3d2608f78c7';
//Current Weather function declared
function currentWeather(searchTerm) {
    console.log('INSIDE CURRENTWEATHER FUNCTION:');
    //Fetching for the current weather here
    var queryUrl =
        'https://api.openweathermap.org/data/2.5/weather?q=' +
        searchTerm +
        '&appid=' +
        apiKey +
        '&units=imperial';

    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('This is my current weather data: ', data);
            //First calls uvi
            uvi(data.coord.lat, data.coord.lon);
            //Creating an element
            var iconEl = $('<img>');
            //adding attirbute to get the icon
            iconEl.attr(
                'src',
                'http://openweathermap.org/img/w/' +
                    data.weather[0].icon +
                    '.png'
            );
            //appending to the cityDateEl element
            cityDateEl.append(iconEl);
            //creating an element
            var tempEl = $('<p>');
            //adding text the jquery way
            tempEl.text('Temperature: ' + data.main.temp + 'F');
            //appending to the cityDateEl element
            cityDateEl.append(tempEl);

            var humidityEl = $('<p>');
            humidityEl.text('Humidity:' + ' ' + data.main.humidity + '%');
            cityDateEl.append(humidityEl);

            //fiveDay(searchTerm);
        });
}
//Declaring the UVI function
function uvi(lat, lon) {
    console.log('INSIDE THE UVI FUNCTION:');
    //fetching with UVI api to get the uvi
    fetch(
        'http://api.openweathermap.org/data/2.5/uvi?lat=' +
            lat +
            '&lon=' +
            lon +
            '&appid=' +
            apiKey +
            '&units=imperial'
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('This is the uvi data : ', data);
            //Here you need look at the data that you get from the UVI. to get the uvi. Then here you want to create elements to add the uvi value. After that you want append it to cityDateEl. Look at currentWeather function to for refereces on how to do that
        });
}

// for (i = 0; i < data.data.length; i++) {
//   var imageEl = $("<img>");
//   imageEl.addClass("col-sm-4");
//   imageEl.attr("src");
// }
function fiveDay(searchTerm) {
    //Here makre
    $('#day1-date').empty;
    $('#day1-date').append(moment().format('MM/DD/YYYY'));
    $('#day2-date').empty;
    $('#day2-date').append(moment().add(1, 'days').calendar());
    $('#day3-date').empty;
    $('#day3-date').append(moment().add(2, 'days').calendar());
    $('#day4-date').empty;
    $('#day4-date').append(moment().add(3, 'days').calendar());
    $('#day5-date').empty;
    $('#day5-date').append(moment().add(4, 'days').calendar());
    // $('#day1-date').empty;
    // $('#day1-date').append(data.list[0].main.temp);
    $('#day1-humidity').empty;
    $('#day1-humidity').append(data.list[0].main.humidity);
    $('#day2-humidity').empty;
    $('#day2-humidity').append(data.list[1].main.humidity);
    $('#day3-humidity').empty;
    $('#day3-humidity').append(data.list[2].main.humidity);
    $('#day4-humidity').empty;
    $('#day4-humidity').append(data.list[3].main.humidity);
    $('#day5-humidity').empty;
    $('#day5-humidity').append(data.list[4].main.humidity);
    $('#day1-wind').empty;
    $('#day1-wind').append(data.list[0].wind.speed);
    $('#day2-wind').empty;
    $('#day2-wind').append(data.list[1].wind.speed);
    $('#day3-wind').empty;
    $('#day3-wind').append(data.list[2].wind.speed);
    $('#day4-wind').empty;
    $('#day4-wind').append(data.list[3].wind.speed);
    $('#day5-wind').empty;
    $('#day5-wind').append(data.list[4].wind.speed);
    $('#day1-fcast').empty;
    $('#day1-fcast').append(data.list[0].main.temp);
    $('#day2-fcast').empty;

    $('#day2-fcast').append(data.list[1].main.temp);
    $('#day3-fcast').empty;
    $('#day3-fcast').append(data.list[2].main.temp);
    $('#day4-fcast').empty;
    $('#day4-fcast').append(data.list[3].main.temp);
    $('#day5-fcast').empty;
    $('#day5-fcast').append(data.list[4].main.temp);
}

// var fiveDayEL =
//   "https://api.openweathermap.org/data/2.5/forecast/daily?q=" +
//   searchTerm +
//   "&cnt=5&appid=" +
//   apiKey + "&units=imperial";
// fetch(fiveDayEL)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     for (var i = 1; i < 6; i++) {
//       var CardEl = $("<div>");
//       CardEl.attr("class", "card bg-primary text-light");
//       forecastEl.append(CardEl);

//       var dateEl = $("<h5>");
//       dateEl.text() = moment().add(i, "days").format("MM/DD/YYYY");
//       forecastEl.append(dateEl);

//       var icon2El = $("<img>");
//       icon2El.attr("src", "http://openweathermap.org/img/wn/" + ".png");
//       CardEl.append(icon2El);

//       var temp2El = $("<p>");
//       temp2El.textcontent = "temp: " + data.daily[i].temp.day;
//       CardEl.append(temp2El);
//     }
//   });
//   cityDateEl.text(searchTerm + "( " + currentDate + ")");
//   fiveDay(searchTerm);
// }

// var humid2El = $("<p>");
// humid2El.textContent = "humidity: " + data.daily[i].humidity;
searchForm.on('click', function (event) {
    event.preventDefault();
    var searchTerm = searchTermEl.val();
    currentWeather(searchTerm);
});