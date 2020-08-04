class Booking {
  constructor(booking) {
    if (booking) {
      this.id = booking.id || null;
      this.userID = booking.userID || null;
      this.date = booking.date || '0000/00/00';
      this.roomNumber = booking.roomNumber || null;
      this.roomServiceCharges = booking.roomServiceCharges || []
    } else {
      this.id = null;
      this.userID = null;
      this.date = '0000/00/00';
      this.roomNumber = null;
      this.roomServiceCharges = []
    }
  }
}

export default Booking;  