"use strict";

const nav = document.querySelector('.header-nav');
const menuBtn = document.querySelector('.menu-btn');

//  getting current date
const date = new Date();
// getting the current month
let currentMonth = date.getMonth();
// getting the current year
let currentYear = date.getFullYear()

//// Dark Mode
const modeButton = document.querySelector("#mode");
const main = document.querySelector("main");

modeButton.addEventListener("click", () => {
    if (modeButton.textContent.includes("🕶️")) {
        main.style.background = "#000";
        main.style.color = "#fff";
        modeButton.textContent = "🔆";
    } else {
        main.style.background = "#eee";
        main.style.color = "#000";
        modeButton.textContent = "🕶️";
    }
});

//Spotlight

const membersHTML = document.querySelectorAll('.member');
const memberDataURL = "data/members.json";

async function apiFetch() {
    try {
        const response = await fetch(memberDataURL);
        if (response.ok) {
            const memberData = await response.json();
            displayResultsMembers(memberData);
        }
        else {
            throw Error(await response.text());
        }
    }
    catch (error) {
        console.log(error);
    }
}

apiFetch();

// Choose 4 random members to display

function displayResultsMembers(data) {
    let indexChosen = [];
    let randomMembers = [];
    let randomMember;
    for (let i = 0; i < 4; i++) {
        randomMember = data.members[Math.floor(Math.random() * data.members.length)];
        if ((randomMember.membership == "Gold" || randomMember.membership == "Silver") && !indexChosen.includes(randomMember)) {
            randomMembers.push(randomMember);
            indexChosen.push(randomMember);
        }
        else {
            i--;
        }
    }
    for (let i = 0; i < membersHTML.length; i++) {
        const member = membersHTML[i];
        const randomMember = randomMembers[i];
        const memberName = document.createElement('h2');
        memberName.textContent = randomMember.name;
        member.appendChild(memberName);
        const memberContent = document.createElement('div');
        memberContent.classList.add('member-content');
        const memberAddress = document.createElement('p');
        memberAddress.textContent = randomMember.address;
        memberContent.appendChild(memberAddress);
        member.appendChild(memberContent);
        const memberLink = document.createElement('a');
        memberLink.setAttribute('href', randomMember.link);
        memberLink.textContent = 'Learn More';
        memberContent.appendChild(memberLink);

        const memberImage = document.createElement('img');
        imgLocation = "images/" + randomMember.logo;
        memberImage.setAttribute('src', imgLocation);
        memberImage.setAttribute('alt', randomMember.name);
        memberImage.setAttribute("loading", "lazy");
        member.appendChild(memberImage);



    }
}


//// Current Weather and 3 Day Forecast

const weather = document.querySelector('#weather-boxx');


const url = 'https://api.openweathermap.org/data/2.5/weather?lat=14.59832&lon=120.98659&appid=0b6396ec51390424c164a6782f787117&units=imperial';
const forecast_url = 'https://api.openweathermap.org/data/2.5/forecast?lat=14.59832&lon=120.98659&cnt=3&appid=0b6396ec51390424c164a6782f787117&units=imperial';

async function apiFetch() {
    try {
        const response = await fetch(url);
        const forecast_response = await fetch(forecast_url);
        if (response.ok && forecast_response.ok) {
            const data = await response.json();
            const forecast = await forecast_response.json();
            displayResults(data, forecast);
        } else {
            throw Error(await response.text());
        }
    }
    catch (error) {
        console.log(error);
    }
}

apiFetch();

function displayResults(data, forecast) {
    //Create Table with current weather
    let tableCurr = document.createElement('table');
    let tableHeadCurr = document.createElement('thead');
    let tableBodyCurr = document.createElement('tbody');
    let tableRowCurr = document.createElement('tr');
    let tableHeadDataCurr = document.createElement('th');
    tableHeadDataCurr.textContent = 'Current Weather';
    tableHeadDataCurr.setAttribute('colspan', '3');
    tableHeadCurr.appendChild(tableHeadDataCurr);
    tableCurr.appendChild(tableHeadCurr);

    //Create 3 columns for current weather
    var tableDataCurr = document.createElement('td');
    var icon = document.createElement('img');
    var iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    var desc = data.weather[0].description;
    icon.setAttribute('src', iconsrc);
    icon.setAttribute('alt', desc);
    tableDataCurr.appendChild(icon);
    tableRowCurr.appendChild(tableDataCurr);

    tableDataCurr = document.createElement('td');
    tableDataCurr.innerHTML = `${data.main.temp}&deg;F`;
    tableRowCurr.appendChild(tableDataCurr);

    tableDataCurr = document.createElement('td');
    tableDataCurr.innerHTML = `${data.weather[0].description}`;
    tableRowCurr.appendChild(tableDataCurr);


    tableBodyCurr.appendChild(tableRowCurr);
    tableCurr.appendChild(tableBodyCurr);



    //Create Table with 3 day forecast
    let table = document.createElement('table');
    let tableHead = document.createElement('thead');
    let tableBody = document.createElement('tbody');
    let tableRow = document.createElement('tr');
    let tableHeadData = document.createElement('th');
    tableHeadData.textContent = '3 Day Forecast';
    tableHeadData.setAttribute('colspan', '3');
    tableHead.appendChild(tableHeadData);
    table.appendChild(tableHead);

    for (let i = 0; i < 3; i++) {
        let tableData = document.createElement('td');
        let icon = document.createElement('img');
        let iconsrc = `https://openweathermap.org/img/w/${forecast.list[i].weather[0].icon}.png`;
        let desc = forecast.list[i].weather[0].description;
        icon.setAttribute('src', iconsrc);
        icon.setAttribute('alt', desc);
        tableData.appendChild(icon);
        tableData.innerHTML += `<br>${forecast.list[i].main.temp}&deg;F`;
        tableRow.appendChild(tableData);
    }
    tableBody.appendChild(tableRow);
    table.appendChild(tableBody);
    table.setAttribute('id', 'forecast');
    tableCurr.setAttribute('id', 'current');
    weather.appendChild(tableCurr);
    weather.appendChild(table);

}

// // Initialize switches
window.addEventListener('load', function () {
    // Initialize the Switch component on all matching DOM nodes
    Array.from(document.querySelectorAll('[role^=switch]')).forEach(
        (element) => {
            new Switch(element)
        }
    );
    displayChamberMembers();
});

// Displaying Chamber members and there membership status
function displayChamberMembers() {
    const memberCardBox = document.querySelector('.member-card-section');
    const gridBtn = document.getElementById('grid-view');
    const listBtn = document.getElementById('list-view');

    const renderMembers = function (members) {
        members.forEach((member) => {
            const html = `
        <div class="member-card">
            <figure>
              <div>
                <img src="${member.image}" alt="${member.name} logo" width="1000" height="623" loading="lazy">
              </div>
              <figcaption>${member.name}</figcaption>
            </figure>
            <div class="member-info-box">
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}">${member.website.slice(8)}</a>
                <img src="${member.membershipLevel}" alt="" width="45" height="64">
            </div>
        </div>
      `;
            memberCardBox.insertAdjacentHTML('afterbegin', html)
        })
    }

    const getMembersData = async function () {
        const membersUrl = 'data/members.json';
        const response = await fetch(membersUrl);
        const data = await response.json();
        renderMembers(data.data);
    }
    getMembersData();


    // ///////////////////////////////////////////////////////
    const saveView = function (view) {
        localStorage.setItem("localView", JSON.stringify(view));
    }

    const changeView = function () {
        const btn = this;

        if (memberCardBox.classList.contains('list')) {
            memberCardBox.classList.remove('list');
        } else {
            memberCardBox.classList.remove('grid');
        }
        memberCardBox.classList.add(btn.id.slice(0, 4))
        saveView(btn.id.slice(0, 4));
    }

    const theView = function () {
        const isView = JSON.parse(localStorage.getItem("localView"));
        console.log(isView);
        if (isView && isView != 0) {
            memberCardBox.classList.add(isView);
        }
    }
    theView();

    gridBtn.addEventListener('click', changeView.bind(gridBtn));
    listBtn.addEventListener('click', changeView.bind(listBtn));
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

/////// Meetup banner

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



