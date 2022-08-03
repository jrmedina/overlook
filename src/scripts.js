// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import Booking from './classes/booking';
import Room from './classes/room';
import Customer from './classes/customer'
import { allData } from './apiCalls'

let customer;
let room;
let booking;

window.addEventListener("load", getData);

function getData() {
allData.then(data => {
customer = data[0]
room = data[1]
booking = data[2]
})
}