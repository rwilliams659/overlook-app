import {expect} from 'chai';
import RoomRepo from '../src/RoomRepo';
import Room from '../src/Room';

describe.only('RoomRepo', function() {
  let room1, room2, room3, roomRepo;

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
      roomType: 'junior suite',
      bidet: true,
      bedSize: 'twin',
      numBeds: 2,
      costPerNight: 480.75
    }

    roomRepo = new RoomRepo([room1, room2, room3]);
  });

  it('should be a function', function() {
    expect(RoomRepo).to.be.a('function');
  });

  it('should be an instance of RoomRepo', function() {
    expect(roomRepo).to.be.an.instanceof(RoomRepo)
  });

  it('should store an array of rooms', function() {
    expect(roomRepo.rooms[0]).to.deep.equal(room1)
  });

  it('each room it stores should be an instance of Room', function() {
    expect(roomRepo.rooms[1]).to.be.an.instanceof(Room);
  });

})