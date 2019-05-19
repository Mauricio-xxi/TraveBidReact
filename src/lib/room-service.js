import axios from 'axios';

class Room {
  constructor() {
    this.rooms = axios.create({
      baseURL: process.env.REACT_APP_URL,
      withCredentials: true
    })
  }

  create(room) {
    const {privateRoom, sharedRoom, 
      entireProperty, tv, wifi, air, garage, termo, washer, pool, privateBathroom, wheelchair, smoke, pet } = room
    const type = "Point";
    const { location, description, roomImage, coordinates } = room;
    return this.rooms.post('/room', { location, description, type, roomImage, coordinates, privateRoom, sharedRoom, 
      entireProperty, tv, wifi, air, garage, termo, washer, pool, privateBathroom, wheelchair, smoke, pet})
      .then(({ data }) => {
        return data
      })
  }
  

  getRoom() {
    return this.rooms.get(`/room`)
      .then(({ data }) => data)
  }

  getRooms(roomID) {
    return this.rooms.get(`/room/${roomID}`)
      .then(({ data }) => data)
  }

  deleteRoom(roomID) {
    return this.rooms.delete(`/room/${roomID}`)
      .then(({ data }) => data)
  }

  updateRoom(Data) {
    return this.rooms.put(`/room/`, { Data})
      .then(({ data }) => data)
  }

}

const room = new Room();

export default room