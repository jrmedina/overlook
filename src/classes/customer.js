class Customer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.bookings = [];
  }

  getBookings(bookings, rooms) {
    this.bookings = bookings.filter((booking) => booking.userID === this.id);
    this.bookings.forEach((booking) => booking.getRoomDetails(rooms));
  }

  getPoints() {
    return this.bookings.reduce((total, cur) => {
      total += cur.roomDetails.costPerNight;
      return total;
    }, 0);
  }
}

export default Customer;
