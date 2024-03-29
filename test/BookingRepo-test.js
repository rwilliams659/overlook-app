import {expect} from 'chai';
import BookingRepo from '../src/BookingRepo';
import Booking from '../src/Booking';
// const Moment = require('moment')

describe('Booking Repo', function() {
  let booking1, booking2, booking3, booking4, bookingRepo;

  before(function() {
    booking1 = {
      id: 'a1',
      userID: 42,
      date: '2020/01/20',
      roomNumber: 4,
      roomServiceCharges: []
    }

    booking2 = {
      id: 'b2',
      userID: 1,
      date: '2020/01/20',
      roomNumber: 18,
      roomServiceCharges: []
    }

    booking3 = {
      id: 'c4',
      userID: 20,
      date: '2020/09/15',
      roomNumber: 4,
      roomServiceCharges: []
    };

    booking4 = {
      id: 'd8',
      userID: 42,
      date: '2017/06/05',
      roomNumber: 23,
      roomServiceCharges: []
    };

    bookingRepo = new BookingRepo([booking1, booking2, booking3, booking4]);
  });

  it('should be a function', function() {
    expect(BookingRepo).to.be.a('function');
  });

  it('should be an instance of BookingRepo', function() {
    expect(bookingRepo).to.be.an.instanceof(BookingRepo);
  });

  it('should store an array of bookings', function() {
    expect(bookingRepo.bookings).to.deep.equal([booking1, booking2, booking3, booking4])
  });

  it('each booking it stores should be an instance of Booking', function() {
    expect(bookingRepo.bookings[1]).to.be.an.instanceof(Booking); 
  });

  it('should be able to return bookings associated with a given user', function() {

    const userBookings = bookingRepo.getUserBookings(42);
    
    expect(userBookings).to.deep.equal([booking1, booking4]);
  });

  it('if a string is passed in for id, it should still return bookings associated with a user if that id can be parsed', function() {
    const userBookings = bookingRepo.getUserBookings('42');

    expect(userBookings).to.deep.equal([booking1, booking4]);
  });

  it('if an argument other than a string or number is passed in for id, it should return an empty array', function() {
    const userBookings = bookingRepo.getUserBookings(null);

    expect(userBookings).to.deep.equal([]);
  });

  it('should be able to return bookings associated with a given date', function() {
    const bookingsOnDate = bookingRepo.getBookingsOnDate('2020/01/20');

    expect(bookingsOnDate).to.deep.equal([booking1, booking2])
  });

  it('if an invalid date is passed in, it should return an empty array', function () {
    const bookingsOnDate = bookingRepo.getBookingsOnDate('202001/20');

    expect(bookingsOnDate).to.deep.equal([])
  });

  it('should be able to find a booking associated with a given date and room number', function() {
    const bookingsOnDate = bookingRepo.getBookingForRoomOnDate(18, '2020/01/20');

    expect(bookingsOnDate).to.deep.equal(booking2)
  });

  it('if a room number is passed in as a string, it should still be able to find a booking associated with a given date and room number', function () {
    const bookingsOnDate = bookingRepo.getBookingForRoomOnDate('18', '2020/01/20');

    expect(bookingsOnDate).to.deep.equal(booking2)
  });

  it('if an invalid room number or date is passed in, it should return undefined', function () {
    const bookingsOnDate = bookingRepo.getBookingForRoomOnDate(true, '2020/01/20');
    const bookingsOnDate2 = bookingRepo.getBookingForRoomOnDate(20, 'teddy bear');

    expect(bookingsOnDate).to.deep.equal(undefined);
    expect(bookingsOnDate2).to.deep.equal(undefined);
  });

  it('should return undefined if it cannot find a booking associated with a given date and room number', function() {
    const bookingsOnDate = bookingRepo.getBookingForRoomOnDate(18, '2020/01/18');

    expect(bookingsOnDate).to.deep.equal(undefined);
  });

  it('should be able to map bookings to just their room number property', function() {
    const bookings = [booking1, booking2, booking3, booking4];

    const bookingRoomNumbers = bookingRepo.mapBookingsToRoomNumber(bookings);

    expect(bookingRoomNumbers).to.deep.equal([4, 18, 4, 23]);
  });

  it('should be able to sort bookings by date from most recent to oldest', function() {
    const bookings = [booking1, booking2, booking3, booking4];
    const sortedBookings = bookingRepo.sortBookingsByDate(bookings);

    expect(sortedBookings).to.deep.equal([booking3, booking1, booking2, booking4])
  });

  it('if an array of items without date properties are passed in, it should return what was passed in', function() {
    const bookings = ['a', 'z', 'f', 'b'];
    const sortedBookings = bookingRepo.sortBookingsByDate(bookings);

    expect(sortedBookings).to.deep.equal(bookings)
  });

  it('if a non-array is passed in, it should return undefined', function () {
    const bookings = 100;
    const sortedBookings = bookingRepo.sortBookingsByDate(bookings);

    expect(sortedBookings).to.deep.equal(undefined);
  });
})