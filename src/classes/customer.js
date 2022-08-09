class Customer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.bookings = [];
    this.username = `customer${this.id}`;
    this.password = `overlook2021`;
  }

  getBookings(bookings, rooms) {
    this.bookings = bookings.filter((booking) => booking.userID === this.id);
    this.bookings.forEach((booking) => booking.getRoomDetails(rooms));
  }

  getPoints() {
    let total = this.bookings.reduce((total, cur) => {
      total += cur.roomDetails.costPerNight;
      return total;
    }, 0);
    return total.toFixed(2);
  }
}

export default Customer;
