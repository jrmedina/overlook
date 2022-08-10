class Hotel {
  constructor(bookingsData, roomsData, customersData) {
    this.bookings = bookingsData;
    this.rooms = roomsData;
    this.customers = customersData;
    this.availableRooms = [];
  }

  findAvailability(input) {
    let booked = this.bookings.filter((res) => res.date === input)
    function notAvailable(room) {
      let available = true;
      booked.forEach((res) => {
        if (res.roomNumber === room.number) {
          available = false;
        }
      });
      return available;
    }

    this.availableRooms = this.rooms.filter((room) => notAvailable(room));
  }

  filterRoomsByType(input) {
    return this.availableRooms.filter((room) => room.roomType === input);
  }

  findCustomer(input) {
    let id = input.split("customer").join("");
    return this.customers.find((guest) => guest.id === parseInt(id));
  }

  checkLogin(username, password) {
    let match = this.findCustomer(username) || "no match";
    if (username === match.username && password === "overlook2021") {
      return true;
    } else {
      return false;
    }
  }
}

export default Hotel;
