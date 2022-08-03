class Booking {
  constructor(bookingData) {
    this.id = bookingData.id;
    this.userID = bookingData.userID;
    this.date = bookingData.date;
    this.roomNumber = bookingData.roomNumber;
    this.roomDetails;
  }

getRoomDetails(rooms)  {
this.roomDetails = rooms.find((room) => {
  return this.roomNumber === room.number;
})

}

}
export default Booking