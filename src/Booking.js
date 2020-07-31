class Booking {
  constructor(booking) {
    if (booking) {
      this.id = booking.id;
      this.userID = booking.userID;
      this.date = booking.date;
      this.roomNumber = booking.roomNumber;
      this.roomServiceCharges = booking.roomServiceCharges
    }
  }
}

export default Booking;  