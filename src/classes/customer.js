import Booking from "./Booking";

class Customer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.bookings = [];
  }

  getBookings(bookings, rooms) {
    this.bookings = bookings.filter((booking) => {
      return booking.userID === this.id;
    });
    this.bookings.forEach((booking) => {
      booking.getRoomDetails(rooms)
    });
  }
}

export default Customer;
