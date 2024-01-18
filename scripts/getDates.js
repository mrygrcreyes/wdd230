// Get Current Year
var currentYear = new Date().getFullYear();

// Set element with id year to current year
document.getElementById("year").innerHTML = currentYear;


// Get Last Modified Date
var lastModified = document.lastModified;

// Set element with id lastModified to last modified date
document.getElementById("lastModified").innerHTML = 'Last Modification: ' + lastModified;

// menu button
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
// function myFunction() {
//     document.getElementById("myDropdown").classList.toggle("show");
// }

// // Close the dropdown if the user clicks outside of it
// window.onclick = function (event) {
//     if (!event.target.matches('.dropbtn')) {
//         var dropdowns = document.getElementsByClassName("dropdown-content");
//         var i;
//         for (i = 0; i < dropdowns.length; i++) {
//             var openDropdown = dropdowns[i];
//             if (openDropdown.classList.contains('show')) {
//                 openDropdown.classList.remove('show');
//             }
//         }
//     }
// }