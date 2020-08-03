import {expect} from 'chai';
import Room from '../src/Room';

describe.only('Room', function() {
  let room1, room2, room3;

  before(function() {
    room1 = new Room({
      number: 4,
      roomType: 'suite',
      bidet: false,
      bedSize: 'king',
      numBeds: 3,
      costPerNight: 210.50
    }), 

    room2 = new Room({
      number: 9,
      roomType: 'single room',
      bidet: false,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 320.18
    }), 

    room3 = new Room({
      number: 18,
      roomType: 'junior suite',
      bidet: true,
      bedSize: 'twin',
      numBeds: 2,
      costPerNight: 480.75
    }) 
  });

  it('should be a function', function() {
    expect(Room).to.be.a('function');
  });

  it('should be an instance of Room', function() {
    expect(room1).to.be.an.instanceof(Room);
  });

  it('should have a room number', function() {
    expect(room2.number).to.equal(9);
  });

  it('should have a roomType', function() {
    expect(room3.roomType).to.equal('junior suite');
  });

  it('should store whether it has a bidet or not', function() {
    expect(room1.bidet).to.equal(false);
  });

  it('should have a bedSize', function() {
    expect(room2.bedSize).to.equal('queen');
  });

  it('should have a specific number of beds', function() {
    expect(room3.numBeds).to.equal(2);
  });

  it('should have a cost per night', function() {
    expect(room2.costPerNight).to.equal(320.18);
  });

  it('if room number property does not exist, it should set a default value of null', function () {
    const roomInfo = {roomType: 'suite', bidet: true, bedSize: 'king', numBeds: 1, costPerNight: 99.99}

    const room = new Room(roomInfo);

    expect(room).to.deep.equal({number: null, roomType: 'suite', bidet: true, bedSize: 'king', numBeds: 1, costPerNight: 99.99});
  });

  it('if room type property does not exist, it should set a default value of standard', function () {
    const roomInfo = {number: 17, bidet: true, bedSize: 'king', numBeds: 1, costPerNight: 99.99}

    const room = new Room(roomInfo);

    expect(room).to.deep.equal({number: 17, roomType: 'standard', bidet: true, bedSize: 'king', numBeds: 1, costPerNight: 99.99});
  })

  it('if bidet property does not exist, it should set a default value of false', function () {
    const roomInfo = {number: 17, roomType: 'suite', bedSize: 'king', numBeds: 1, costPerNight: 99.99}

    const room = new Room(roomInfo);

    expect(room).to.deep.equal({number: 17, roomType: 'suite', bidet: false, bedSize: 'king', numBeds: 1, costPerNight: 99.99});
  });

  it('if bed size property does not exist, it should set a default value of standard', function () {
    const roomInfo = {number: 17, roomType: 'suite', bidet: true, numBeds: 1, costPerNight: 99.99}

    const room = new Room(roomInfo);

    expect(room).to.deep.equal({number: 17, roomType: 'suite', bidet: true, bedSize: 'standard', numBeds: 1, costPerNight: 99.99});
  });

  it('if number of beds property does not exist, it should set a default value of 2', function () {
    const roomInfo = {number: 17, roomType: 'suite', bidet: true, bedSize: 'queen', costPerNight: 99.99}

    const room = new Room(roomInfo);

    expect(room).to.deep.equal({number: 17, roomType: 'suite', bidet: true, bedSize: 'queen', numBeds: 2, costPerNight: 99.99});
  });

  it('if room cost per night property does not exist, it should set a default value of 150', function () {
    const roomInfo = {number: 17, roomType: 'suite', bidet: true, bedSize: 'queen', numBeds: 1}

    const room = new Room(roomInfo);

    expect(room).to.deep.equal({number: 17, roomType: 'suite', bidet: true, bedSize: 'queen', numBeds: 1, costPerNight: 150});
  });

  it('if an object is not passed in, it should create a room object with all default values', function () {

    const room = new Room(77);

    expect(room).to.deep.equal({number: null, roomType: 'standard', bidet: false, bedSize: 'standard', numBeds: 2, costPerNight: 150});
  });

  it('if no argument is passed on, it should instantiate an object will all default values', function () {
    const room = new Room();

    expect(room).to.deep.equal({number: null, roomType: 'standard', bidet: false, bedSize: 'standard', numBeds: 2, costPerNight: 150});
  });
})