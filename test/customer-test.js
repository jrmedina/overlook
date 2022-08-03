import chai from "chai";
const expect = chai.expect;
import Customer from "../src/classes/customer";
import Booking from "../src/classes/Booking";
import { testCustomers, testBookings } from "../src/testData";

describe("customer", () => {
  expect(Customer).to.be.a("function");
});

let customer1;
let booking1;
let bookingsData;

beforeEach(() => {
  customer1 = new Customer(testCustomers[1]);
  booking1 = new Booking(testBookings[1]);
  bookingsData = testBookings;
});

it("should be able to retrieve  data from test file", () => {
  expect(customer1).to.deep.equal({
    id: 27,
    name: "Sigrid Barrows",
    bookings: [],
  });
  expect(booking1).to.deep.equal({
    id: "5fwrgu4i7k55hl70q",
    userID: 31,
    date: "2022/02/13",
    roomNumber: 5,
  });
});

it("should be able to retrieve bookings related to the customer", () => {
  expect(customer1.bookings).to.deep.equal([]);
  customer1.getBookings(bookingsData);
  expect(customer1.bookings).to.deep.equal([
    {
      date: "2021/11/23",
      id: "5fwrgu4i7k55hl8ec",
      roomNumber: 6,
      userID: 27,
    },
    {
      date: "2023/12/15",
      id: "5fwrgu4i7k55hl6vp",
      roomNumber: 14,
      userID: 27,
    },
  ]);
});
