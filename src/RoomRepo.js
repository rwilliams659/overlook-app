import Room from './Room'

class RoomRepo {
  constructor(rooms) {
    this.rooms = rooms.map(room => new Room(room))
  }
}

export default RoomRepo; 