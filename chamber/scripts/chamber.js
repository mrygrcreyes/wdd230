"use strict";

const nav = document.querySelector('.header-nav');
const menuBtn = document.querySelector('.menu-btn');

//  getting current date
const date = new Date();
// getting the current month
let currentMonth = date.getMonth();
// getting the current year
let currentYear = date.getFullYear()


class Switch {
    constructor(switchMode) {
        this.switchBtn = switchMode;
        this.switchBtn.addEventListener('click', () => this.toggleStatus());
        this.switchBtn.addEventListener('keydown', (event) =>
            this.handleKeydown(event)
        );
    }

    handleKeydown(event) {
        // Only do something when space or return is pressed
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.toggleStatus();
        }
    }
}

function toggleNav() {
    const toggleMenu = function () {
        nav.classList.toggle('show-nav')
    }

    menuBtn.addEventListener('click', toggleMenu);
}
toggleNav();

// ///////////////////////////////////////////////
// The active page functionality - highlight the current  active 
// page
function activePage() {

    function setActiveLink() {
        const navLinks = document.querySelectorAll('.nav-links');
        const currentURL = window.location.href;

        navLinks.forEach(link => {
            if (currentURL === link.href) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    setActiveLink();
}
activePage();

/////////////////// HOME PAGE SECTION ////////////////////
//////////////////////////////////////////////////////////
// The weather forecast functionality. Displaying the weather
// forecast to the user
// function weatherForecast() {
//     const lat = -25.74433236181061;
//     const long = 28.234333823643258;
//     const apiKey = '0b6396ec51390424c164a6782f787117';

//     const currentTemp = document.querySelector('#current-temp');
//     const weatherIcon = document.querySelector('#weather-icon');
//     const captionDesc = document.querySelector('#description');
//     const windSpeed = document.querySelector('#windspeed');
//     const windDirection = document.querySelector('#wind-direction');

//     const weatherUrl = ``;

//     const forecastUrl = ``;

//     const apiFetch = async function () {
//         try {
//             const response1 = await fetch(weatherUrl);
//             if (response1.ok) {
//                 const weatherData = await response1.json();
//                 displayResults(weatherData)
//             } else {
//                 throw Error(await response1.text());
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     function displayResults(data) {
//         currentTemp.innerHTML = `${data.main.temp}&deg;C`;
//         const iconsrc = ``;
//         let desc = data.weather[0].description;
//         weatherIcon.setAttribute('src', iconsrc);
//         weatherIcon.setAttribute('alt', 'weather-icon');
//         captionDesc.textContent = `${desc}`;
//         windSpeed.textContent = data.wind.speed;
//         windDirection.innerHTML = `${data.wind.deg}&deg;`
//     }
//     apiFetch();
// }
// weatherForecast();



// ////////////////////////////////////////////////////////////
function displayDate() {
    const theYear = document.querySelector('#year');
    const lastModify = document.querySelector('.last-modify');

    const getDate = function () {
        const date = new Date();
        const option = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        };

        const dateNYear = {
            time: date.toTimeString(),
            year: date.getFullYear(),
            date: new Intl.DateTimeFormat("en-SA", option).format(date),
        };
        return dateNYear;
    }
    theYear.textContent = `${getDate().year}`;
    lastModify.textContent = `${getDate().date} - ${getDate().time}`;
};
displayDate();
