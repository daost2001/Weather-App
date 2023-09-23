apiKey = "f74ce17bfb6dc167b635e5d8812f57f7" // api key

let weather = {
    fetchWeather: function (city) { //fetch weather from api
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city 
            + "&units=metric&appid=" 
            + apiKey
        ).then((response) => response.json())
        .then((data) =>this.displayWeather(data));
    },
    displayWeather: function(data){ //display weather on main widget
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity} = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon +".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity +"%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed +" km/h";
        document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + " landscape')";
        document.querySelector(".weather").classList.remove("loading")
    },
    search:function() {
        this.fetchWeather(document.querySelector(".search-bar").value) //allow users to see weather from a specific location
        document.querySelector(".search-bar").value = "";
    }
}

document.querySelector(".search button").addEventListener("click", function() { // search button
        weather.search();
})

document.querySelector(".search-bar").addEventListener("keyup",function(event) { // search through enter key
    if (event.key == "Enter"){
        weather.search();
    }
})

function getPosition() {
    // Simple wrapper
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
}
async function main() {
    var position = await getPosition();  // wait for getPosition to complete to retrieve coordinates of current location

    const data = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat="
        + position.coords.latitude  
        + "&lon=" 
        + position.coords.longitude
        + "&appid="
        + apiKey
    ).then((response) => response.json());
    weather.fetchWeather(data.name);// retrieve weather from openweather api
}
main();