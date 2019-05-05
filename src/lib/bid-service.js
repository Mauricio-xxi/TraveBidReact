import axios from 'axios';

class Bid {
  constructor() {
    this.bids = axios.create({
      baseURL: process.env.REACT_APP_URL,
      withCredentials: true
    })
  }

  create(bid) {
    const { description, value, offerID} = bid;
    return this.bids.post('/bid', { description, value, offerID})
      .then(({ data }) => {
        return data
      })
      .catch(error => console.log(error))
  }

  getBids(offerID) {
    return this.bids.get(`/bid/${offerID}`)
      .then(({ data }) => data)
      .catch(error => console.log(error))
  }

  getUserBids(userID) {
    return this.bids.get(`/bid/userBids/${userID}`)
      .then(({ data }) => data)
      .catch(error => console.log(error))
  }


  deleteBid(bidID) {
    return this.bids.delete(`/bid/${bidID}`)
      .then(({ data }) => data)
      .catch(error => console.log(error))
  }

  editBid(bid) {
    const {bidID, description, value, Status, offerID } = bid;
    return this.bids.put(`/bid/${bidID}`, { description, value, Status, offerID })
      .then(({ data }) => data)
      .catch(error => console.log(error))
  }

  acceptBid(bid) {
    const {bidID, Status, offerID } = bid;
    return this.bids.put(`/bid/${bidID}/accept`, { Status, offerID })
      .then(({ data }) => data)
      .catch(error => console.log(error))
  }

  declineBid(bid) {
    const {bidID, Status } = bid;
    return this.bids.put(`/bid/${bidID}/decline`, { Status })
      .then(({ data }) => data)
      .catch(error => console.log(error))
  }



}

const bid = new Bid();

export default bid
