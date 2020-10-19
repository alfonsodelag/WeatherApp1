// Go to this URL and register https://openweathermap.org/appid
// Get your API KEY (appid)

const APIkey = "407841297f6d5308dcdfc4d27edfeba0";
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?';

const onSuccess = position => {
    console.log('Desde onSuccess', position);

    const { coords: { latitude, longitude } } = position;
    callWeather(latitude, longitude);
}

const onError = error => {
    console.log('Desde onError', error);

    const notification = document.createElement('p');
    notification.innerText = error.message;

    const divNotification = document.getElementsByClassName("notification")[0];

    divNotification.style.display = "block";
    notification.innerText = 'el usuario ha negado la ubicación';

    divNotification.appendChild(notification)
}

const convertKelvinToCelsisus = kelvin => kelvin - 273.15;

const WeatherInfo = info => {
    const {
        main: { temp },
        name: name,
        sys: { country },
        weather: [{ description, icon }]
    } = info

    console.log("info que necesito", convertKelvinToCelsius(temp), main, name)
    const iconElement = getElementsByClassName('weather-icon')[0];
    iconElement.src = `icons/${icon}.png`;

    const temperature = document.getElementById("temperature-value");
    temperature.innerText = `${convertKelvinToCelsisus(temp)} °C`;
}

const callWeather = (latitude, longitude) => {
    console.log(latitude, longitude)
    const call = fetch(`${baseURL}lat=${latitude}&lon=${longitude}&appid=${APIkey}`);
    call.then(response => response.json()).then((weatherInfo) => console.log(weatherInfo));
    call.catch(error => console.error(error));

}

navigator.geolocation.getCurrentPosition(onSuccess, onError);