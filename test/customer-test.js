import chai from "chai";
const expect = chai.expect;
import Customer from "../src/classes/Customer";
import Booking from "../src/classes/Booking";
import Room from "../src/classes/Room";
import { testCustomers, testBookings, testRooms } from "../src/testData";

describe("customer", () => {
  expect(Customer).to.be.a("function");
});

let customer1;
let bookingsData;
let roomsData;

beforeEach(() => {
  customer1 = new Customer(testCustomers[1]);
  bookingsData = testBookings.map((booking) => new Booking(booking));
  roomsData = testRooms.map((room) => new Room(room));
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

it("should be able to find the sum of the customers bookings cost", () => {
  customer1.getBookings(bookingsData, roomsData);
  expect(customer1.getPoints()).to.equal(722.6);
});
