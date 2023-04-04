import "./css/styles.css";
import Booking from "./classes/booking";
import Room from "./classes/room";
import Customer from "./classes/customer";
import Hotel from "./classes/hotel";
import { allData } from "./apiCalls";
// import { fetchData } from "./apiCalls";

var addBooking;
var bookingsData;
var customerData;
var customer;
var hotel;
var roomsData;
var fetchData;
var newBooking;

// -------------------QUERY-------------------

const bookingButton = document.querySelector(".nav-booking");
const bookingError = document.querySelector(".booking-error");
const bookingTab = document.querySelector(".booking-tab");
const calendar = document.querySelector('input[type="date"]');
const calendarError = document.querySelector(".calendar-error");
const currentPoints = document.querySelector(".current-points");
const errorMessage = document.querySelector(".close-error");
const header = document.querySelector(".mid-container");
const homeButton = document.querySelector(".nav-home");
const invalidLogin = document.querySelector(".login-error");
const imgContainer = document.querySelector(".img-container");
const portalExit = document.querySelector(".close-portal");
const passwordInput = document.querySelector(".password-input");
const roomTypeSection = document.querySelector(".room-types");
const roomDetails = document.querySelector(".room-details");
const searchDates = document.querySelector(".search-dates");
const submitLoginButton = document.querySelector(".login-btn");
const resultsSection = document.querySelector(".filtered-results");
const usernameInput = document.querySelector(".username-input");
const dashboardButton = document.querySelector(".dashboard-login");

// -------------------EVENT-------------------
dashboardButton.addEventListener("click", displayDashboard);
bookingButton.addEventListener("click", displayBooking);
errorMessage.addEventListener("click", closeError);
homeButton.addEventListener("click", displayHome);
portalExit.addEventListener("click", closePortal);
roomTypeSection.addEventListener("click", filterRooms);
searchDates.addEventListener("click", searchAvailableDates);
submitLoginButton.addEventListener("click", submitLogin);
window.addEventListener("load", getData);

function getData() {
  allData.then((data) => {
    customerData = data[0].customers.map((guest) => new Customer(guest));
    roomsData = data[1].rooms.map((room) => new Room(room));
    bookingsData = data[2].bookings.map((booking) => new Booking(booking));
    addBooking = data[3];
    fetchData = data[4];
    loadData();
  });
}

function loadData() {
  hotel = new Hotel(bookingsData, roomsData, customerData);
  calendar.min = new Date().toJSON().slice(0, 10);
  customer = hotel.customers[29]
  console.log(customer)
 displayDashboard();
}

function searchAvailableDates() {
  if (calendar.value === "") {
    show(calendarError);
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
    type.setAttribute("aria-expanded", true);
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

function cloneFilteredRooms(rooms) {
  rooms.forEach((type) => {
    let room = roomDetails.cloneNode(true);
    show(room);
    let bookButton = document.createElement("button");
    bookButton.classList.add("booking");
    bookButton.innerText = "Book Room";
    bookButton.id = type.number;
    bookButton.addEventListener("click", bookRoom);
    room.querySelector(".roomType").innerText = `Room Type: ${type.roomType}`;
    room.querySelector(".bidet").innerText = `${bidet(type.bidet)}`;
    room.querySelector(".bedSize").innerText = `Bed: ${type.bedSize}`;
    room.querySelector(
      ".numBeds"
    ).innerText = `Number of Beds: ${type.numBeds}`;
    room.querySelector(".date").innerText = `Date: ${calendar.value}`;
    room.querySelector(
      ".cost"
    ).innerText = `Price Per Night: $${type.costPerNight} USD`;
    resultsSection.appendChild(room);
    room.appendChild(bookButton);
  });
  show(resultsSection);
}

function bookRoom(e) {
  let calendarSplit = calendar.value.split("-");
  let calendarJoined = calendarSplit.join("/");
  let id = e.target.id;
  if (customer === undefined) {
    show(bookingError);
  } else {
    show(bookingError);
    bookingError.style.color = `#228B22`;
    bookingError.innerText = `Booking Confirmed! Your points will be updated after your stay.`;
    let booking = {
      userID: customer.id,
      date: calendarJoined,
      roomNumber: parseInt(id),
    };
    addBooking(booking).then((response) => {
      newBooking = new Booking(response.newBooking);
      hotel.bookings.push(newBooking);
      setTimeout(displayDashboard, 2000);
    });
  }
}

function submitLogin() {
  resultsSection.innerHTML = "";
  hide(imgContainer);
  if (hotel.checkLogin(usernameInput.value, passwordInput.value)) {
    show(dashboardButton);
    hide(loginPortal);
    show(logoutButton);
    customer = hotel.findCustomer(usernameInput.value);
    customer.getBookings(hotel.bookings, hotel.rooms);
    show(currentPoints);
    currentPoints.innerText = `Welcome Back, ${
      customer.name
    } you have earned ${customer.getPoints()} points`;
    cloneCustomersRooms(customer.bookings);
  } else {
    show(invalidLogin);
  }
}

function displayDashboard() {
  resultsSection.innerHTML = "";
  hide(imgContainer)
  customer.getBookings(hotel.bookings, hotel.rooms);
  cloneCustomersRooms(customer.bookings);
}

function cloneCustomersRooms(rooms) {
  rooms.forEach((type) => {
    let room = roomDetails.cloneNode(true);
    show(room);
    room.classList.add("room");
    room.querySelector(
      ".roomType"
    ).innerText = `Room Type: ${type.roomDetails.roomType}`;
    room.querySelector(".bidet").innerText = `${bidet(type.roomDetails.bidet)}`;
    room.querySelector(
      ".bedSize"
    ).innerText = `Bed: ${type.roomDetails.bedSize}`;
    room.querySelector(
      ".numBeds"
    ).innerText = `Number of Beds: ${type.roomDetails.numBeds}`;
    room.querySelector(".date").innerText = `Date:  ${type.date}`;
    room.querySelector(
      ".cost"
    ).innerText = `Cost: $${type.roomDetails.costPerNight} USD`;
    resultsSection.appendChild(room);
  });
  show(resultsSection);
}

function bidet(value) {
  if (value) {
    return `It has a Bidet!`;
  } else {
    return ``;
  }
}

function displayFilteredRooms(rooms) {
  roomTypeSection.innerHTML = ``;
  hide(bookingTab);
  cloneFilteredRooms(rooms);
}

function displayLogin() {
  hide(loginButton);
  hide(bookingTab);
  hide(resultsSection);
  hide(bookingError);
  hide(invalidLogin);
  show(header);
  show(loginPortal);
  show(imgContainer);
  show(homeButton);
}

function displayHome() {
  hide(homeButton);
  hide(bookingError);
  hide(bookingTab);
  hide(loginPortal);
  hide(resultsSection);
  show(loginButton);
  show(bookingButton);
  show(imgContainer);
  show(header);
}

function logoutCustomer() {
  customer = "";
  resultsSection.innerHTML = "";
  currentPoints.innerText = "";
  hide(logoutButton);
  hide(bookingError);
  hide(resultsSection);
  show(loginButton);
  show(header);
  show(imgContainer);
}

function displayBooking() {
  show(bookingTab);

  show(homeButton);
  hide(imgContainer);

  hide(bookingError);
  resultsSection.innerText = "";
}

function closePortal() {
  hide(loginPortal);
  show(loginButton);
}

function closeError() {
  hide(bookingError);
}

function hide(el) {
  el.classList.add("hidden");
}

function show(el) {
  el.classList.remove("hidden");
}
