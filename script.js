const Apikey = "1d007db15d94b6e9f1c56be53890b281";
const BaseUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const input = document.querySelector("input");
const searchBtn = document.querySelector(".searchBtn");
const WeatherUpdate = document.querySelector(".city-sec img");


searchBtn.addEventListener("click",()=>{
    if(input.value.trim() === ""){
        alert("please enter the city name first");
        return;
    }else{
        checkWeather(input.value);
    }
})
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        if(input.value.trim() === ""){
            alert("Please enter the city name first");
            return;
        } else {
            checkWeather(input.value);
        }
    }
});


async function checkWeather(City) {
    const response = await fetch(`${BaseUrl}${City}&appid=${Apikey}`);
    input.value = "";
    if(response.status === 404){
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather-update").style.display = "none";
        document.querySelector(".weather-info").style.display = "none";
    }else{
        let data = await response.json();
        console.log(data)

        document.querySelector(".centigrade").innerHTML = Math.floor(data.main.temp) + "°C";
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        
    if(data.weather[0].main === "Clouds"){
        WeatherUpdate.src = "animated/cloudy.svg"
    }
    else if(data.weather[0].main === "Rain" ){
        WeatherUpdate.src = "animated/snowy-4.svg"
    } 
    else if(data.weather[0].main === "Clear" ){
        WeatherUpdate.src = "animated/day.svg"
    }
    else if(data.weather[0].main === "Drizzle" ){
        WeatherUpdate.src = "animated/snowy-1.svg"
    }
    else if(data.weather[0].main === "Mist" ){
        WeatherUpdate.src = "animated/cloudy.svg"
    }
    else if(data.weather[0].main === "Snow" ){
        WeatherUpdate.src = "animated/snowy-3.svg"
    }
        document.querySelector(".weather-update").style.display = "flex";
        document.querySelector(".weather-info").style.display = "grid";
        document.querySelector(".error").style.display = "none"
    }
}
