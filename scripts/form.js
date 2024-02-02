"use strict";

const isPasswdSameMsg = document.querySelector(".is-passwd-same");
const passwd = document.getElementById('password');
const confirmPasswd = document.getElementById('confirm-passwd');


const isPasswdConfirmed = function () {
    if (passwd.value !== confirmPasswd.value) {
        const message = `❗️WRONG PASSWORD`
        isPasswdSameMsg.textContent = message;
        confirmPasswd.classList.add("notsame");
    } else {
        isPasswdSameMsg.textContent = "";
        confirmPasswd.classList.remove("notsame");
    }
}

confirmPasswd.addEventListener('focusout', isPasswdConfirmed);



// Page Rating
const rangevalue = document.getElementById("rangevalue");
const range = document.getElementById("page-rating");

// RANGE event listener
range.addEventListener('change', displayRatingValue);
range.addEventListener('input', displayRatingValue);

function displayRatingValue() {
    rangevalue.innerHTML = range.value;
}
