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

  getRoomOccupancy(bookings) {
    return Math.round((bookings.length / this.rooms.length) * 100); 
  }

  getRoomsByType(rooms, type) {
    return rooms.filter(room => room.roomType === type);
  }

  calculateTotalCost(rooms) {
    return Math.round(rooms.reduce((cost, room) => cost + room.costPerNight, 0) * 100) / 100;
  }

}

export default RoomRepo; 