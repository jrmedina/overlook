import chai from "chai";
const expect = chai.expect;
import Room from "../src/classes/Room";
import { testRooms } from "../src/testData";

describe("room", () => {
  expect(Room).to.be.a("function");
});

let roomsData;
let room;

beforeEach(() => {
  roomsData = testRooms.map((room) => new Room(room));
  room = roomsData[2];
});

it("should be able to retrieve data to create a new instance of Room", () => {
  expect(room).to.deep.equal({
    number: 20,
    roomType: "residential suite",
    bidet: false,
    bedSize: "queen",
    numBeds: 1,
    costPerNight: 343.95,
  });
});
