import {expect} from 'chai';
import Booking from '../src/Booking';

describe.only('Booking', function() {
  let booking1, booking2;

  before(function() {
    booking1 = new Booking({
      id: 'a1',
      userID: 1,
      date: '20219/07/04',
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

  it('if no object is passed on, it should instantiate an empty object', function() {
    const booking3 = new Booking();

    expect(booking3).to.deep.equal({});
  });
})