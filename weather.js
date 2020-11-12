$(document).ready(function () {
    var searchButton = $("#search-button");
    var history = $(".search-history");

    searchButton.on("click", function () {
        var cityInput = $(".city-input").val()

        $(".city-input").val("");

        var newCity = $("<li>");
        newCity.addClass("list-group-item");
        newCity.text(cityInput);

        history.prepend(newCity);

        $(".city").text(cityInput);

        var openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
        var apiKey = "&appid=ff0fbb04d2a445c1ac5789fb33f3d957";



        $.ajax({
            url: openWeatherUrl + cityInput + apiKey,
            method: "GET",
        }).then(function (weatherData) {
            var feels = (weatherData.main.feels_like- 273.15) * 1.80 + 32
            var farenheit = (weatherData.main.temp - 273.15) * 1.80 + 32;
            var farenHigh = (weatherData.main.temp_max - 273.15) * 1.80 + 32;
            var farenLow = (weatherData.main.temp_min - 273.15) * 1.80 + 32;
            var humid = weatherData.main.humidity;
            var windInfo = weatherData.wind.speed;
            var img = $('<img>')
            var imgSrc = weatherData.weather[0].icon
            var image = 'https://openweathermap.org/img/wn/' + imgSrc + '.png'

            img.attr('src', image)

            var city = $('.city')
            var feelsLike = $('.feels-like').text('Feels Like: ')
            var humidPercent = $('.humid').text('Humidity ')
            var temperature = $('.tempertature').text('Current Temperature: ')
            var todaysHigh = $('.todays-high').text('Todays High: ')
            var todaysLow = $('.todays-low').text('Todays Low: ')
            var windSpeed = $('.wind-speed').text('Wind Speed: ')

            city.append(img)
            feelsLike.append(feels.toFixed(0) + '°F')
            temperature.append(farenheit.toFixed(0) + '°F')
            todaysHigh.append(farenHigh.toFixed(0) + '°F')
            todaysLow.append(farenLow.toFixed(0) + '°F')
            humidPercent.append(humid + '%')
            windSpeed.append(windInfo + 'MPH')

            console.log(weatherData);

            var uvLat = weatherData.coord.lat
            var uvLon = weatherData.coord.lon
            var openWeatherUv = 'https://api.openweathermap.org/data/2.5/uvi?lat=' + uvLat + '&lon=' + uvLon + apiKey
            var uvIndex = $('.uv-index').text('UV Index: ')

            $.ajax({
                url: openWeatherUv,
                method: 'GET'
            }).then(function(weatherData){
                var uvVal = (weatherData.value)
                uvIndex.addClass('btn btn-sm text-center').append(uvVal)
    
                if (uvVal < 3) {
                    uvIndex.addClass('btn-success')
                }
                else if (uvVal < 8) {
                    uvIndex.addClass('btn-warning')
                }
                else {uvIndex.addClass('btn-danger')}
            })

        });

        

    });
});
