import {expect} from 'chai';
import BookingRepo from '../src/BookingRepo';
import Booking from '../src/Booking';

describe.only('Booking', function() {
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
      date: '2018/09/15',
      roomNumber: 4,
      roomServiceCharges: []
    };

    booking4 = {
      id: 'd8',
      userID: 42,
      date: '2017/06/05',
      roomNumber: 4,
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

  it('should be able to return bookings associated with a given date', function() {
    const bookingsOnDate = bookingRepo.getBookingsOnDate('2020/01/20');

    expect(bookingsOnDate).to.deep.equal([booking1, booking2])
  })
})