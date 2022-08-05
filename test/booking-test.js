import chai from "chai";
const expect = chai.expect;
import Customer from "../src/classes/Customer";
import Booking from "../src/classes/Booking";
import Room from "../src/classes/Room";
import { testCustomers, testBookings, testRooms } from "../src/testData";

describe("booking", () => {
  expect(Booking).to.be.a("function");
});

let bookingsData;
let roomsData;
let booking1;

beforeEach(() => {
  bookingsData = testBookings.map(booking => new Booking(booking))
  roomsData = testRooms.map((room) => new Room(room));
  booking1 = bookingsData[1];
});

it("should be able to retrieve room details by the room number on the booking", () => {
  booking1.getRoomDetails(roomsData);
  expect(booking1.roomDetails).to.deep.equal({
    bedSize: "twin",
    bidet: false,
    costPerNight: 328.15,
    numBeds: 2,
    number: 21,
    roomType: "junior suite",
  });
});
