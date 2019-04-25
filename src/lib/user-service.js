import axios from 'axios';

 class User {
  constructor() {
    this.user = axios.create({
      baseURL: 'http://localhost:5000',
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