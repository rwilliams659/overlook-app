import {expect} from 'chai';
import RoomRepo from '../src/RoomRepo';
import Room from '../src/Room';

describe('RoomRepo', function() {
  let room1, room2, room3, roomRepo, booking1, booking2, booking3;

  before(function() {
    room1 = {
      number: 4,
      roomType: 'suite',
      bidet: false,
      bedSize: 'king',
      numBeds: 3,
      costPerNight: 210.50
    }

    room2 = {
      number: 9,
      roomType: 'single room',
      bidet: false,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 320.18
    }

    room3 = {
      number: 18,
      roomType: 'suite',
      bidet: true,
      bedSize: 'twin',
      numBeds: 2,
      costPerNight: 480.75
    }

    roomRepo = new RoomRepo([room1, room2, room3]);

    booking1 = {
      id: 'a1',
      userID: 1,
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

  });

  it('should be a function', function() {
    expect(RoomRepo).to.be.a('function');
  });

  it('should be an instance of RoomRepo', function() {
    expect(roomRepo).to.be.an.instanceof(RoomRepo);
  });

  it('should store an array of rooms', function() {
    expect(roomRepo.rooms[0]).to.deep.equal(room1);
  });

  it('each room it stores should be an instance of Room', function() {
    expect(roomRepo.rooms[1]).to.be.an.instanceof(Room);
  });

  it('given unavailable room numbers, it should be able to return available rooms', function() {
    const availableRooms = roomRepo.getAvailableRooms([11, 9]);

    expect(availableRooms).to.deep.equal([room1, room3])
  });

  it('if anything other than an array of numbers is passed in, it should return all rooms', function () {
    const availableRooms = roomRepo.getAvailableRooms(['pineapple', 'banana']);
    const availableRooms2 = roomRepo.getAvailableRooms(45)

    expect(availableRooms).to.deep.equal([room1, room2, room3]);
    expect(availableRooms2).to.deep.equal([room1, room2, room3]);
  });

  it('given bookings, it should return an array of rooms associated with each booking', function() {
    const roomsBooked = roomRepo.getRoomsFromBookings([booking1, booking2]);

    expect(roomsBooked).to.deep.equal([room1, room3])
  });

  it('given bookings, it should return an array of rooms associated with each booking, including repeats of rooms', function() {
    const roomsBooked = roomRepo.getRoomsFromBookings([booking1, booking2, booking3]);

    expect(roomsBooked).to.deep.equal([room1, room3, room1])
  });

  it('a data type other than an array is passed in, it should return an empty array', function () {
    const roomsBooked = roomRepo.getRoomsFromBookings({name: 'Mr. Smith'});

    expect(roomsBooked).to.deep.equal([])
  });

  it('if no room is found where the booking number matches the booking\'s room number, that room should not be added to the returned array', function () {
    const booking4 = {
      id: 'z26',
      userID: 23,
      date: '2020/08/20',
      roomNumber: null,
      roomServiceCharges: []
    }
    const roomsBooked = roomRepo.getRoomsFromBookings([booking1, booking2, booking3, booking4]);

    expect(roomsBooked).to.deep.equal([room1, room3, room1])
  });

  it('given bookings, it should be able to calculate room occupancy', function() {
    const todaysBookings = [booking1, booking2];
    const roomOccupancy = roomRepo.getRoomOccupancy(todaysBookings);

    expect(roomOccupancy).to.deep.equal(67)
  });

  it('if a non-array is passed in, it should return a room occupancy of 0', function () {
    const roomOccupancy = roomRepo.getRoomOccupancy('rubber duck');

    expect(roomOccupancy).to.deep.equal(0)
  });

  it('should be able to return rooms in a given room type', function() {
    const rooms = [room1, room2, room3];
    const type = 'suite';
    const roomsInType = roomRepo.getRoomsByType(rooms, type);

    expect(roomsInType).to.deep.equal([room1, room3]); 
  });

  it('if an invalid room type is passed in, it should return an empty array', function () {
    const rooms = [room1, room2, room3];
    const type = 'palace';
    const roomsInType = roomRepo.getRoomsByType(rooms, type);

    expect(roomsInType).to.deep.equal([]);
  });

  it('if a non-array is passed in as the rooms argument, it should return an empty array', function () {
    const rooms = 500;
    const type = 'suite';
    const roomsInType = roomRepo.getRoomsByType(rooms, type);

    expect(roomsInType).to.deep.equal([]);
  });

  it('should be able to calculate total cost of given rooms', function() {
    const rooms = [room1, room2, room3]
    const cost = roomRepo.calculateTotalCost(rooms);

    expect(cost).to.equal(1011.43);
  });

  it('if a non-array is passed in as the rooms argument, it should return 0', function () {
    const rooms = 'kitten'
    const cost = roomRepo.calculateTotalCost(rooms);

    expect(cost).to.equal(0);
  });
})