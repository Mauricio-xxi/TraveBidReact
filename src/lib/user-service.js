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
  async updateUser(userInfo){
    const {
      email,
      age,
      gender,
      description,
      city,
      userImage
    } = userInfo;
    try {
      const data = await this.user.put(`/profile`,{      email,
        age,
        gender,
        description,
        city,
        userImage})
        return ({data});

    } catch (error) {
      console.error(error)
    }
  }
}
const user = new User();

export default user