// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import Booking from "./classes/booking";
import Room from "./classes/room";
import Customer from "./classes/customer";
import Hotel from "./classes/hotel";

import { allData } from "./apiCalls";

let customerData;
var customer;
let roomsData;
let bookingsData;
var hotel;
// -------------------QUERY-------------------
let loginButton = document.querySelector(".nav-login");
let logoutButton = document.querySelector(".nav-logout");
let loginPortal = document.querySelector(".login-portal");
let closePortal = document.querySelector(".close-portal");
let usernameInput = document.querySelector(".username-input");
let passwordInput = document.querySelector(".password-input");
let submitLoginButton = document.querySelector(".login-btn");
let invalidLogin = document.querySelector(".login-error");
let calender = document.querySelector('input[type="date"]');
let searchDates = document.querySelector(".search-dates");
let roomTypeSection = document.querySelector(".room-types");
let roomDetails = document.querySelector(".room-details");
let bookingTab = document.querySelector(".booking-tab");
let bookingButton = document.querySelector(".nav-booking");
let totalPoints = document.querySelector(".total");

let resultsSection = document.querySelector(".filtered-results");

// -------------------EVENT-------------------
loginButton.addEventListener("click", displayLogin);
logoutButton.addEventListener('click', logoutCustomer)
submitLoginButton.addEventListener("click", submitLogin);
bookingButton.addEventListener('click', displayBooking)
closePortal.addEventListener("click", hidePortal);
window.addEventListener("load", getData);
roomTypeSection.addEventListener("click", filterRooms);
searchDates.addEventListener("click", searchAvailableDates);

function getData() {
  allData.then((data) => {
    customerData = data[0].customers.map((guest) => new Customer(guest));
    roomsData = data[1].rooms.map((room) => new Room(room));
    bookingsData = data[2].bookings.map((res) => new Booking(res));
    loadData();
  });
}

function loadData() {
  hotel = new Hotel(bookingsData, roomsData, customerData);
  console.log(hotel);
}

function searchAvailableDates() {
  let calenderSplit = calender.value.split("-");
  let calenderJoined = calenderSplit.join("/");
  hotel.findAvailability(calenderJoined);
  displayAvailableRoomTypes();
}

function displayAvailableRoomTypes() {
  let reduced = hotel.availableRooms.reduce((acc, cur) => {
    if (!acc.includes(cur.roomType)) {
      acc.push(cur.roomType);
    }
    return acc;
  }, []);

  reduced.forEach((room) => {
    let type = document.createElement("button");
    type.classList.add("list");
    type.type = "button";
    type.innerText = room;
    roomTypeSection.appendChild(type);
  });
}

function filterRooms(e) {
  let roomType = e.target.closest(".list");
  let matchingRooms = hotel.filterRoomsByType(roomType.innerText);
  displayFilteredRooms(matchingRooms);
}

function displayFilteredRooms(rooms) {
  roomTypeSection.innerHTML = ``;
  hide(bookingTab);
  cloneFilteredRooms(rooms);
}

function cloneFilteredRooms(rooms) {
  rooms.forEach((type) => {
    let room = roomDetails.cloneNode(true);
    room.classList.add("room");
    room.querySelector(".roomType").innerText = type.roomType;
    room.querySelector(".bidet").innerText = type.bidet;
    room.querySelector(".bedSize").innerText = type.bedSize;
    room.querySelector(".numBeds").innerText = type.numBeds;
    room.querySelector(".date").innerText = calender.innerText;
    room.querySelector(".cost").innerText = type.costPerNight;
    resultsSection.appendChild(room);
  });
  show(resultsSection);
}

function displayLogin() {
  hide(loginButton);
  hide(bookingTab)
  show(loginPortal);
}

function submitLogin() {
  if (hotel.checkLogin(usernameInput.value, passwordInput.value)) {
    hide(loginPortal)
    show(logoutButton)
    customer = hotel.findCustomer(usernameInput.value);
    customer.getBookings(hotel.bookings, hotel.rooms);
    cloneCustomersRooms(customer.bookings);
  } else {
    show(invalidLogin);
  }
  usernameInput.value = ``;
  passwordInput.value = ``;
}


function logoutCustomer() {
    customer = ''
    resultsSection.innerHTML = ''
    hide(logoutButton)
    show(loginButton)
}

function cloneCustomersRooms(rooms) {
  rooms.forEach((type) => {
    let room = roomDetails.cloneNode(true);
    room.classList.add("room");
    room.querySelector(".roomType").innerText = type.roomDetails.roomType;
    room.querySelector(".bidet").innerText = type.roomDetails.bidet;
    room.querySelector(".bedSize").innerText = type.roomDetails.bedSize;
    room.querySelector(".numBeds").innerText = type.roomDetails.numBeds;
    room.querySelector(".date").innerText = type.date;
    room.querySelector(".cost").innerText = type.roomDetails.costPerNight;
    resultsSection.appendChild(room);
  });
  totalPoints.innerText = `Your Total Points: ${customer
    .getPoints()
    .toFixed(2)}`;
  show(resultsSection);
}


function displayBooking() {
    show(bookingTab)
    hide(loginPortal)
    resultsSection.innerText = ''
}

function hidePortal() {
  hide(loginPortal);
  show(loginButton)
}

function hide(el) {
  el.classList.add("hidden");
}

function show(el) {
  el.classList.remove("hidden");
}
