import axios from 'axios';

class Room {
  constructor() {
    this.Rooms = axios.create({
      baseURL: process.env.REACT_APP_URL,
      withCredentials: true
    })
  }

  create(room) {
    const { location, comodities } = room;
    return this.rooms.post('/room', { location, comodities})
      .then(({ data }) => {
        return data
      })
  }

  getRoom() {
    return this.rooms.get(`/room`)
      .then(({ data }) => data)
  }

  deleteRoom(roomID) {
    return this.rooms.delete(`/room/${roomID}`)
      .then(({ data }) => data)
  }

  updateRoom(roomID) {
    const { location, comodities} = room;
    return this.rooms.put(`/room/${roomID}`, { location, comodities})
      .then(({ data }) => data)
  }

}

const room = new Room();

export default room