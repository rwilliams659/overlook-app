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
}

export default BookingRepo; 