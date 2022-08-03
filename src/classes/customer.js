class Customer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.bookings = []
  }

getBookings(bookings) {
 this.bookings = bookings.filter((booking) => {
    return booking.userID === this.id
  })

}





}


export default Customer