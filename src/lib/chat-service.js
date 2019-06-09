import axios from 'axios';

class Chat {
  constructor() {
    this.chats = axios.create({
      baseURL: process.env.REACT_APP_URL,
      withCredentials: true
    })
  }
}

  const chat = new Chat();

  export default chat