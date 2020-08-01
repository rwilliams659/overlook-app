import Booking from './Booking'
const Moment = require('moment')

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

  sortBookingsByDate(bookings) {
    let sortedBookings = bookings.sort((a, b) => {
      return new Moment(b.date).format('YYYYMMDD') - new Moment(a.date).format('YYYYMMDD');
    });
    return sortedBookings; 
  }
}

export default BookingRepo; 