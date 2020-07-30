import Booking from './Booking'

class BookingRepo {
  constructor(bookings) {
    this.bookings = bookings.map(booking => new Booking(booking))
  }
}

export default BookingRepo; 