class Hotel {
  constructor(bookingsData, roomsData, customersData) {
    this.bookings = bookingsData;
    this.rooms = roomsData;
    this.customers = customersData;
    this.availableRooms = [];
  }

  findAvailability(input) {
    let booked = this.bookings.filter((res) => res.date === input);

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
  // potentially reassign the availableRooms key to the result of this method instead of 'matching'
}

export default Hotel;
