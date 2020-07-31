import Booking from './Booking'

class BookingRepo {
  constructor(bookings) {
    this.bookings = bookings.map(booking => new Booking(booking))
  }

  getUserBookings(id) {
    return this.bookings.filter(booking => booking.userID === id);
  }

  getBookingsOnDate(date) {
    return this.bookings.filter(booking => booking.date === date);
  }

  mapBookingsToRoomNumber(bookings) {
    return bookings.map(booking => booking.roomNumber);
  }
}

export default BookingRepo; 