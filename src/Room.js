class Room {
  constructor(room) {
    if (room) {
      this.number = room.number || null;
      this.roomType = room.roomType || 'standard';
      this.bidet = room.bidet || false;
      this.bedSize = room.bedSize || 'standard';
      this.numBeds = room.numBeds || 2;
      this.costPerNight = room.costPerNight || 150
    } else {
      this.number = null;
      this.roomType = 'standard';
      this.bidet = false;
      this.bedSize = 'standard';
      this.numBeds = 2;
      this.costPerNight = 150
    }
  }
}

export default Room;  