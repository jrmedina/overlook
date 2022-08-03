import chai from "chai";
const expect = chai.expect;
import Customer from "../src/classes/Customer";
import Booking from "../src/classes/Booking";
import { testCustomers, testBookings, testRooms } from "../src/testData";

describe("customer", () => {
  expect(Customer).to.be.a("function");
});

let customer1;
let booking1;
let booking2;
let booking3;
let booking4;
let booking5;
let bookingsData;
let roomsData;

beforeEach(() => {
  customer1 = new Customer(testCustomers[1]);
  booking1 = new Booking(testBookings[0]);
  booking2 = new Booking(testBookings[1]);
  booking3 = new Booking(testBookings[2]);
  booking4 = new Booking(testBookings[3]);
  booking5 = new Booking(testBookings[4]);
  bookingsData = [booking1, booking2, booking3, booking4, booking5];
  roomsData = testRooms;
});

it("should be able to retrieve  data from test file", () => {
  expect(customer1).to.deep.equal({
    id: 27,
    name: "Sigrid Barrows",
    bookings: [],
  });
});

it("should be able to retrieve bookings related to the customer AND the room details", () => {
  expect(customer1.bookings).to.deep.equal([]);
  customer1.getBookings(bookingsData, roomsData);
  expect(customer1.bookings).to.deep.equal([
    {
      id: "5fwrgu4i7k55hl6vp",
      userID: 27,
      date: "2023/12/15",
      roomNumber: 14,
      roomDetails: {
        bedSize: "king",
        bidet: false,
        costPerNight: 491.14,
        numBeds: 1,
        number: 14,
        roomType: "single room",
      },
    },
    {
      id: "5fwrgu4i7k55hl8ec",
      userID: 27,
      date: "2021/11/23",
      roomNumber: 6,
      roomDetails: {
        number: 6,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 231.46,
      },
    },
  ]);

});
