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

  it('if no object is passed on, it should instantiate an empty object', function () {
    const room4 = new Room();

    expect(room4).to.deep.equal({})
  });
})