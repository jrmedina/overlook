import chai from "chai";
const expect = chai.expect;
import Customer from "../src/classes/Customer";
import Booking from "../src/classes/Booking";
import Room from "../src/classes/Room";
import { testCustomers, testBookings, testRooms } from "../src/testData";

describe("booking", () => {
  expect(Booking).to.be.a("function");
});

let room1;
let booking1;
let bookingsData;
let roomsData

beforeEach(() => {
  booking1 = new Booking(testBookings[1]);
  room1 = new Room (testRooms[0])
  bookingsData = testBookings;
  roomsData = testRooms
});

it('should be able to retrieve room details that have the same room number in the booking', () => {
  booking1.getRoomDetails(roomsData);
  expect(booking1.roomDetails).to.deep.equal({
    bedSize: "twin",
    bidet: false,
    costPerNight: 328.15,
    numBeds: 2,
    number: 21,
    roomType: "junior suite",
  });
})