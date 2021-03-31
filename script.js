var searchForm = $("#search-form");
var searchTermEl = $("#search-term");
var cityDateEl = $("#city-date");
var currentDate = moment().format("MM/DD/YYYY");
var forecastEl = $("#forecast");

var apiKey = "3cedb9cbd39b61d549cab3d2608f78c7";

searchForm.on("click", function (event) {
  event.preventDefault();
  var searchTerm = searchTermEl.val();
  currentWeather(searchTerm);

 
});

// var cityName = "Atlanta";


function currentWeather(searchTerm) {
  var queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchTerm +
    "&appid=" +
    apiKey + "&units=imperial";

  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      uvi(data.coord.lat, data.coord.lon);
      var iconEl = $("<img>");
      iconEl.attr(
        "src",
        "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
      );
      cityDateEl.append(iconEl);

      var tempEl = $("<p>");
      tempEl.text("Temperature: " + data.main.temp + "F");
      

      var humidityEl = $("<p>");
      humidityEl.textContent = "Humidity:" + " " + data.main.humidity + "%";
      searchForm.append(humidityEl);

      //fiveDay(searchTerm);
    });



function uvi(lat, lon) {
  fetch(
    "http://api.openweathermap.org/data/2.5/uvi?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      apiKey +
      "&units=imperial"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
    });
}

// for (i = 0; i < data.data.length; i++) {
//   var imageEl = $("<img>");
//   imageEl.addClass("col-sm-4");
//   imageEl.attr("src");
// }
function fiveDay(searchTerm) {
  var fiveDayEL =
    "https://api.openweathermap.org/data/2.5/forecast/daily?q=" +
    searchTerm +
    "&cnt=5&appid=" +
    apiKey + "&units=imperial";
  fetch(fiveDayEL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 1; i < 6; i++) {
        var CardEl = $("<div>");
        CardEl.attr("class", "card bg-primary text-light");
        forecastEl.append(CardEl);

        var dateEl = $("<h5>");
        dateEl.text() = moment().add(i, "days").format("MM/DD/YYYY");
        forecastEl.append(dateEl);

        var icon2El = $("<img>");
        icon2El.attr("src", "http://openweathermap.org/img/wn/" + ".png");
        CardEl.append(icon2El);

        var temp2El = $("<p>");
        temp2El.textcontent = "temp: " + data.daily[i].temp.day;
        CardEl.append(temp2El);
      }
    });
    cityDateEl.text(searchTerm + "( " + currentDate + ")");
    fiveDay(searchTerm);
  }


  // var humid2El = $("<p>");
  // humid2El.textContent = "humidity: " + data.daily[i].humidity;
  // CardEl.append(humid2El);
}
