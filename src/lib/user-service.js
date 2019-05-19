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

  getUserBid(id) {
    return this.user.post(`/profile/`,{id} )
      .then(({ data }) => data)
  }

  async updateUser(userInfo){
    const {
      age,
      gender,
      description,
      city,
      userImage
    } = userInfo;
    try {
      const data = await this.user.put(`/profile`,{
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