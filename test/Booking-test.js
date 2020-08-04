import {expect} from 'chai';
import Booking from '../src/Booking';

describe('Booking', function() {
  let booking1, booking2;

  before(function() {
    booking1 = new Booking({
      id: 'a1',
      userID: 1,
      date: '2019/07/04',
      roomNumber: 4,
      roomServiceCharges: []
    })

    booking2 = new Booking({
      id: 'b2',
      userID: 13,
      date: '2020/01/20',
      roomNumber: 18,
      roomServiceCharges: []
    })
  });

  it('should be a function', function() {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of Booking', function() {
    expect(booking1).to.be.an.instanceof(Booking);
  });

  it('should have an id', function() {
    expect(booking2.id).to.equal('b2');
  });

  it('should have a user ID', function() {
    expect(booking1.userID).to.equal(1)
  });

  it('should have a date', function() {
    expect(booking2.date).to.equal('2020/01/20');
  });

  it('should have a room number', function() {
    expect(booking1.roomNumber).to.equal(4);
  });

  it('should have room service charges', function() {
    expect(booking2.roomServiceCharges).to.deep.equal([]);
  });

  it('if booking id property does not exist, it should set a default value of null', function() {
    const bookingInfo = {userID: 5, date: '2022/06/05', roomNumber: 10, roomServiceCharges: []}

    const booking = new Booking(bookingInfo);

    expect(booking).to.deep.equal({ id: null, userID: 5, date: '2022/06/05', roomNumber: 10, roomServiceCharges: [] })
  })

  it('if booking user id property does not exist, it should set a default value of null', function () {
    const bookingInfo = { id: 5, date: '2022/06/05', roomNumber: 10, roomServiceCharges: [] }

    const booking = new Booking(bookingInfo);

    expect(booking).to.deep.equal({ id: 5, userID: null, date: '2022/06/05', roomNumber: 10, roomServiceCharges: [] })
  });

  it('if booking date property does not exist, it should set a default value', function () {
    const bookingInfo = { id: 5, userID: 12, roomNumber: 10, roomServiceCharges: [] }

    const booking = new Booking(bookingInfo);

    expect(booking).to.deep.equal({ id: 5, userID: 12, date: '0000/00/00', roomNumber: 10, roomServiceCharges: [] })
  });

  it('if booking roomNumber does not exist, it should set a default value of null', function () {
    const bookingInfo = { id: 5, userID: 12, date: '2022/06/05', roomServiceCharges: [] }

    const booking = new Booking(bookingInfo);

    expect(booking).to.deep.equal({ id: 5, userID: 12, date: '2022/06/05', roomNumber: null, roomServiceCharges: [] })
  });

  it('if booking room service charges property does not exist, it should set a default value of an empty array', function () {
    const bookingInfo = { id: 5, userID: 12, date: '2022/06/05', roomNumber: 10 }

    const booking = new Booking(bookingInfo);

    expect(booking).to.deep.equal({ id: 5, userID: 12, date: '2022/06/05', roomNumber: 10, roomServiceCharges: [] })
  }); 

  it('if an object is not passed in, it should create an object with all default values', function() {
    const booking = new Booking(true);

    expect(booking).to.deep.equal({ id: null, userID: null, date: '0000/00/00', roomNumber: null, roomServiceCharges: [] })
  });

  it('if no argument is passed on, it should instantiate an object will all default values', function () {
    const booking3 = new Booking();

    expect(booking3).to.deep.equal({ id: null, userID: null, date: '0000/00/00', roomNumber: null, roomServiceCharges: [] });
  });
})