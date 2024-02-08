const weatherBox = document.querySelector('.weather-box');
const weatherIcon = document.querySelector('.weather-icon');


const lat = 14.59832;
const long = 120.98659;
const apiKey = '0b6396ec51390424c164a6782f787117';

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;

const apiFetch = async function () {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            displayResults(data)
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', 'weather-icon');
    const msgForcast = `${data.main.temp}&deg;F - ${desc}`;
    weatherBox.innerHTML = msgForcast;
}

apiFetch();