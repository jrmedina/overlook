import chai from "chai";
const expect = chai.expect;
import Customer from "../src/classes/Customer";
import Booking from "../src/classes/Booking";
import Room from "../src/classes/Room";
import Hotel from "../src/classes/Hotel";

import { testCustomers, testBookings, testRooms } from "../src/testData";

describe("hotel", () => {
  expect(Hotel).to.be.a("function");
});
let customersData;
let bookingsData;
let roomsData;
let hotel;

beforeEach(() => {
  customersData = testCustomers.map((customer) => new Customer(customer));
  bookingsData = testBookings.map((booking) => new Booking(booking));
  roomsData = testRooms.map((room) => new Room(room));
  hotel = new Hotel(bookingsData, roomsData, customersData);
});

it("should be able to use data to update hotel", () => {
  expect(hotel.bookings.length).to.equal(7);
  expect(hotel.rooms.length).equal(7);
  expect(hotel.customers.length).to.equal(5);
  expect(hotel.availableRooms.length).to.equal(0);
});

it("should be able to take in a date and return available rooms", () => {
  expect(hotel.availableRooms.length).to.equal(0);
  hotel.findAvailability("2022/02/13");
  expect(hotel.availableRooms.length).to.equal(5);
  expect(hotel.availableRooms).to.deep.include(
    {
      number: 22,
      roomType: "single room",
      bidet: false,
      bedSize: "full",
      numBeds: 2,
      costPerNight: 350.31,
    },
  );
});

it("should be able to filter available rooms by type", () => {
  hotel.findAvailability("2022/02/13");
  expect(hotel.filterRoomsByType("single room")).to.deep.include({
    number: 6,
    roomType: "single room",
    bidet: false,
    bedSize: "queen",
    numBeds: 2,
    costPerNight: 231.46,
  });

});

// it("should be able to return rooms that are already booked", () => {
//   expect(hotel.findAvailability("2022/02/13")).to.deep.equal([
//     {
//       id: "5fwrgu4i7k55hl70q",
//       userID: 31,
//       date: "2022/02/13",
//       roomNumber: 5,
//     },
//   ]);
// });
