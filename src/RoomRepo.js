import Room from './Room'

class RoomRepo {
  constructor(rooms) {
    this.rooms = rooms.map(room => new Room(room))
  }

  getAvailableRooms(roomNumbers) {
    if (Array.isArray(roomNumbers)) {
      return this.rooms.filter(room => !roomNumbers.includes(room.number));
    } else {
      return this.rooms; 
    }
  }

  getRoomsFromBookings(bookings) {
    if (Array.isArray(bookings)) {
      return bookings.reduce((roomsBooked, booking) => {
        let room = this.rooms.find(room => room.number === booking.roomNumber);
        roomsBooked.push(room);
        return roomsBooked; 
      }, []);
    } else {
      return [];
    }
  }

  getRoomOccupancy(bookings) {
    if (Array.isArray(bookings)) {
      return Math.round((bookings.length / this.rooms.length) * 100); 
    } else {
      return 0;
    }
  }

  getRoomsByType(rooms, type) {
    if (Array.isArray(rooms)) {
      return rooms.filter(room => room.roomType === type);
    } else {
      return []
    }
  }

  calculateTotalCost(rooms) {
    if (Array.isArray(rooms)) {
      return Math.round(rooms.reduce((cost, room) => cost + room.costPerNight, 0) * 100) / 100
    } else {
      return 0;
    }
  }

}

export default RoomRepo; 