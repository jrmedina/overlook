const testBookings = [
  { id: "5fwrgu4i7k55hl6vp", userID: 27, date: "2023/12/15", roomNumber: 14 },
  { id: "5fwrgu4i7k55hl6zi", userID: 23, date: "2022/01/23", roomNumber: 21 },
  { id: "5fwrgu4i7k55hl70q", userID: 31, date: "2022/02/13", roomNumber: 5 },
  { id: "5fwrgu4i7k55hl8ec", userID: 27, date: "2021/11/23", roomNumber: 6 },
  { id: "5fwrgu4i7k55hl8dj", userID: 14, date: "2023/12/07", roomNumber: 1 },
];

const testRooms = [
  {
    number: 6,
    roomType: "single room",
    bidet: false,
    bedSize: "queen",
    numBeds: 2,
    costPerNight: 231.46,
  },
  {
    number: 20,
    roomType: "residential suite",
    bidet: false,
    bedSize: "queen",
    numBeds: 1,
    costPerNight: 343.95,
  },
  {
    number: 22,
    roomType: "single room",
    bidet: false,
    bedSize: "full",
    numBeds: 2,
    costPerNight: 350.31,
  },
  {
    bedSize: "king",
    bidet: false,
    costPerNight: 491.14,
    numBeds: 1,
    number: 14,
    roomType: "single room",
  },
  {
    bedSize: "twin",
    bidet: false,
    costPerNight: 328.15,
    numBeds: 2,
    number: 21,
    roomType: "junior suite",
  },
];

const testCustomers = [
  { id: 18, name: "Triston Leffler" },
  { id: 27, name: "Sigrid Barrows" },
  { id: 46, name: "Louisa Homenick" },
  { id: 50, name: "Eldridge Muller" },
  { id: 1, name: "Leatha Ullrich" },
];

module.exports = { testBookings, testRooms, testCustomers };
