import Booking from './Booking'
const Moment = require('moment')

class BookingRepo {
  constructor(bookings) {
    this.bookings = bookings.map(booking => new Booking(booking))
  }

  getUserBookings(id) {
    if (typeof id === 'string') {
      id = parseInt(id);
    }
    return this.bookings.filter(booking => booking.userID === id);
  }

  getBookingsOnDate(date) {
    return this.bookings.filter(booking => booking.date === date);
  }

  getBookingForRoomOnDate(roomNumber, date) {
    if (typeof roomNumber === 'string') {
      roomNumber = parseInt(roomNumber);
    }
    return this.bookings.find(booking => booking.roomNumber === roomNumber && booking.date === date);
  }

  mapBookingsToRoomNumber(bookings) {
    return bookings.map(booking => booking.roomNumber);
  }

  sortBookingsByDate(bookings) {
    if (Array.isArray(bookings)) {
      return bookings.sort((a, b) => {
        return new Moment(b.date).format('YYYYMMDD') - new Moment(a.date).format('YYYYMMDD');
      });
    } 
  }
}

export default BookingRepo; 