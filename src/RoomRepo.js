import Room from './Room'

class RoomRepo {
  constructor(rooms) {
    this.rooms = rooms.map(room => new Room(room))
  }

  getAvailableRooms(roomNumbers) {
    return this.rooms.filter(room => !roomNumbers.includes(room.number));
  }

  getRoomsFromBookings(bookings) {
    return bookings.reduce((roomsBooked, booking) => {
      let room = this.rooms.find(room => room.number === booking.roomNumber);
      roomsBooked.push(room);
      return roomsBooked; 
    }, []);
  }

}

export default RoomRepo; 