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

    // Switch state of a switch
    toggleStatus() {
        const currentState =
            this.switchBtn.getAttribute('aria-checked') === 'true';
        const switchDot = this.switchBtn.querySelector('.switch span');
        const newState = String(!currentState);

        this.switchBtn.setAttribute('aria-checked', newState);
        switchDot.classList.toggle('moveRight');
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

//////////////////////////////////////////////////////////
// Meetup banner
function meetupBanner() {
    const date = new Date();

    if (date.getDay() >= 1 && date.getDay() <= 3) {
        const banner = document.getElementById('banner');
        banner.style.display = 'flex';

        const closeBanner = document.getElementById('closeBanner');
        closeBanner.addEventListener('click', function () {
            banner.style.display = 'none';
            console.log(banner);
        });
    }
}
meetupBanner();

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

//DISCOVER HTML -- DATE & TIME 
function feedbackMessage() {
    const messageBox = document.querySelector('.message-box');

    const welcomeMsg = `<p>Welcome! Let us know if you have any questions.</p>`;
    const welcomeBack = `<p>Back so soon! Awesome!</p>`;
    const sinceLastVist = `<p>You last visited [n] days ago</p>`;

    // number of milliseconds in a day
    const millisecToDay = (1000 * 60 * 60 * 24);

    // checking if previous visit timestamp exist in local storage
    let lastVisit = Number(JSON.parse(localStorage.getItem("visitTimeStamp")));
    // getting today's date in milliseconds
    const currentTime = Date.now();

    if (lastVisit) {
        // calculating the days past since the last visit 

        const daysPast = Math.abs(Math.trunc((currentTime - lastVisit) / millisecToDay));
        // give user feedback based on the days past
        if (daysPast === 0) {
            messageBox.innerHTML = welcomeBack;
        } else {
            messageBox.innerHTML = sinceLastVist.replace('[n]', daysPast);
        }
    } else {
        messageBox.innerHTML = welcomeMsg;
    }

    localStorage.setItem('visitTimeStamp', JSON.stringify(currentTime))
}
feedbackMessage();


// /////////////////////////////////////////////////////////
// // function for rendering the days in the calendar
function displayCalender() {
    const daysContainer = document.querySelector(".days");
    // const nextMonthBtn = document.querySelector(".next-btn");
    const prevMonthBtn = document.querySelector(".prev-btn");
    const month = document.querySelector(".the-date");
    const todayBtn = document.querySelector('.today');

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const renderCalender = function () {
        // getting the previous, current and next month days
        date.setDate(1);
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const lastDayIndex = lastDay.getDay();
        const lastDayDate = lastDay.getDate();
        const prevLastDay = new Date(currentYear, currentMonth, 0);
        const prevLastDayDate = prevLastDay.getDate();
        const nextDays = (7 - lastDayIndex) - 1;

        // updating the current year and month in header
        month.innerHTML = `${months[currentMonth]} ${currentYear}`;
        // updating the days 
        let days = '';

        // updating previous days 
        for (let x = firstDay.getDay(); x > 0; x--) {
            days += `<div class="day prev">${prevLastDayDate - x + 1}</div>`;
        }

        // current month days
        for (let i = 1; i <= lastDayDate; i++) {
            // check if its today then add today class
            if (i === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
                // if date month year matches add today
                days += `<div class="day today">${i}</div>`;
            } else {
                // else dont add today
                days += `<div class="day">${i}</div>`;
            }
        }

        // next month days
        for (let j = 1; j <= nextDays; j++) {
            days += `<div class="day next">${j}</div>`
        }

        hideTodayBtn();
        daysContainer.innerHTML = days;
    }
    renderCalender();

    // nextMonthBtn.addEventListener('click', () => {
    //     // increase the current month by one
    //     currentMonth++
    //     if (currentMonth > 11) {
    //         // if current month is greater 11, set it zero and increase year by one
    //         currentMonth = 0;
    //         currentYear++
    //     }
    //     // render calendar
    //     renderCalender();
    // });

    // prevMonthBtn.addEventListener("click", () => {
    //     // decrease by one
    //     currentMonth--;
    //     // checking if it's less than 0 set it to 11 and decrease year
    //     if (currentMonth < 0) {
    //         currentMonth = 11;
    //         currentYear--;
    //     }
    //     // render calendar
    //     renderCalender();
    // });

    // go to today
    todayBtn.addEventListener('click', () => {
        // set the month and year to current
        currentMonth = date.getMonth();
        currentYear = date.getFullYear();
        // render calendar
        renderCalender();
    });

    // hiding today button if it's already the current date
    function hideTodayBtn() {
        if (currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
            todayBtn.style.display = "none";
        } else {
            todayBtn.style.display = "flex";
        }
    }

}
displayCalender();


//weather

// const weatherBox = document.querySelector('.weather-box');
// const weatherIcon = document.querySelector('.weather-icon');

// const lat = -25.74804;
// const long = 28.23708;
// const apiKey = 'f4619f75c2d45cc1bfe1a55992e82aaa';

// const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;

// const apiFetch = async function () {
//     try {
//         const response = await fetch(url);
//         if (response.ok) {
//             const data = await response.json();
//             // console.log(data); 
//             displayResults(data)
//         } else {
//             throw Error(await response.text());
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// function displayResults(data) {
//     const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
//     let desc = data.weather[0].description;
//     weatherIcon.setAttribute('src', iconsrc);
//     weatherIcon.setAttribute('alt', 'weather-icon');
//     const msgForcast = `${data.main.temp}&deg;F - ${desc}`;
//     weatherBox.innerHTML = msgForcast;
// }

// apiFetch();