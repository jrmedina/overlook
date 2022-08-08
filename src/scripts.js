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

var customerData;
var customer;
var roomsData;
var bookingsData;
var addBooking;
var deleteBooking;
var hotel;

// -------------------QUERY-------------------
const loginButton = document.querySelector(".nav-login");
const logoutButton = document.querySelector(".nav-logout");
const loginPortal = document.querySelector(".login-portal");
const closePortal = document.querySelector(".close-portal");
const usernameInput = document.querySelector(".username-input");
const passwordInput = document.querySelector(".password-input");
const submitLoginButton = document.querySelector(".login-btn");
const invalidLogin = document.querySelector(".login-error");
const calendar = document.querySelector('input[type="date"]');
const searchDates = document.querySelector(".search-dates");
const roomTypeSection = document.querySelector(".room-types");
const roomDetails = document.querySelector(".room-details");
const bookingTab = document.querySelector(".booking-tab");
const bookingButton = document.querySelector(".nav-booking");
const totalPoints = document.querySelector(".total");
const resultsSection = document.querySelector(".filtered-results");
const bookingBtn = document.querySelector(".booking");
const calendarError = document.querySelector(".calendar-error");

// -------------------EVENT-------------------
loginButton.addEventListener("click", displayLogin);
logoutButton.addEventListener("click", logoutCustomer);
submitLoginButton.addEventListener("click", submitLogin);
bookingButton.addEventListener("click", displayBooking);
closePortal.addEventListener("click", hidePortal);
window.addEventListener("load", getData);
roomTypeSection.addEventListener("click", filterRooms);
searchDates.addEventListener("click", searchAvailableDates);

function getData() {
  allData.then((data) => {
    customerData = data[0].customers.map((guest) => new Customer(guest));
    roomsData = data[1].rooms.map((room) => new Room(room));
    bookingsData = data[2].bookings.map((res) => new Booking(res));
    addBooking = data[3];
    deleteBooking = data[4];
    loadData();
  });
}

function loadData() {
  hotel = new Hotel(bookingsData, roomsData, customerData);
}

function searchAvailableDates() {
  if(calendar.value === ''){
    show(calendarError)
  } else {
  let calendarSplit = calendar.value.split("-");
  let calendarJoined = calendarSplit.join("/");
  hide(calendarError);
  hotel.findAvailability(calendarJoined);
  displayAvailableRoomTypes();
  }
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
    let bookButton = document.createElement("button");
    bookButton.classList.add("booking");
    bookButton.innerText = "Book Room";
    bookButton.id = type.number;
    bookButton.addEventListener("click", bookRoom);
    room.querySelector(".roomType").innerText = `Room Type: ${type.roomType}`
    room.querySelector(".bidet").innerText = `Has Bidet: ${type.bidet}`
    room.querySelector(".bedSize").innerText = `Bed Size: ${type.bedSize}`
    room.querySelector(".numBeds").innerText = `Number of Beds: ${type.numBeds}`
    room.querySelector(".date").innerText = `Date: ${calendar.value}`
    room.querySelector(".cost").innerText = `Price Per Night: ${type.costPerNight}`;
    resultsSection.appendChild(room);
    room.appendChild(bookButton);
  });
  show(resultsSection);
}

function displayLogin() {
  hide(loginButton);
  hide(bookingTab);
  hide(resultsSection)
  show(loginPortal);

}

function submitLogin() {
  if (hotel.checkLogin(usernameInput.value, passwordInput.value)) {
    hide(loginPortal);
    show(logoutButton);
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
  customer = "";
  resultsSection.innerHTML = "";
  hide(logoutButton);
  show(loginButton);
}

function cloneCustomersRooms(rooms) {
  rooms.forEach((type) => {
    let room = roomDetails.cloneNode(true);
    room.classList.add("room");
    room.querySelector(".roomType").innerText = type.roomDetails.roomType;
    // room.querySelector(".room-img").src = `.images/${type.roomDetails.roomType}`
    room.querySelector(".bidet").innerText = type.roomDetails.bidet;
    room.querySelector(".bedSize").innerText = type.roomDetails.bedSize;
    room.querySelector(".numBeds").innerText = type.roomDetails.numBeds;
    room.querySelector(".date").innerText = type.date;
    room.querySelector(".cost").innerText = type.roomDetails.costPerNight;
    resultsSection.appendChild(room);
  });
  // totalPoints.innerText = `Your Total Points: ${customer
  //   .getPoints()
  //   .toFixed(2)}`;
  show(resultsSection);
}

function displayBooking() {
  show(bookingTab);
  hide(loginPortal);
  resultsSection.innerText = "";
}

function bookRoom(e) {
  let calendarSplit = calendar.value.split("-");
  let calendarJoined = calendarSplit.join("/");
  let id = e.target.id;

  if (customer === undefined) {
    console.log("please log in to continue!");
  } else {
    let booking = {
      userID: customer.id,
      date: calendarJoined,
      roomNumber: parseInt(id)
    };
    addBooking(booking).then(newRes => console.log(newRes))
    resultsSection.innerHTML = ``;
    customer.getBookings(hotel.bookings, hotel.rooms);
    cloneCustomersRooms(customer.bookings);
  }
}

function hidePortal() {
  hide(loginPortal);
  show(loginButton);
}

function hide(el) {
  el.classList.add("hidden");
}

function show(el) {
  el.classList.remove("hidden");
}
