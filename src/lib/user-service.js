import axios from 'axios';

 class User {
  constructor() {
    this.user = axios.create({
      baseURL: process.env.REACT_APP_URL,
      withCredentials: true
    })
  }
  getUser() {
    return this.user.get(`/profile/`)
      .then(({ data }) => data)
  }
}
const user = new User();

export default user