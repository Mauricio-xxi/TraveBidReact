import axios from 'axios';

class Bid {
  constructor() {
    this.bids = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    })
  }

  create(bid) {
    const { description, value, offerID} = bid;
    return this.bids.post('/bid', { description, value, offerID})
      .then(({ data }) => {
        return data
      })
  }

  getBids(offerID) {
    return this.bids.get(`/bid/${offerID}`)
      .then(({ data }) => data)
  }

  // getOffer(offerID) {
  //   return this.offers.get(`/offer/${offerID}`)
  //     .then(({ data }) => data)
  // }

  // searchOffers (city) {
  //   return this.offers.get(`/offer/search/${city}`)
  //     .then(({ data }) => data )
  // }

  // deleteOffer(offerID) {
  //   return this.offers.delete(`/offer/${offerID}`)
  //     .then(({ data }) => data)
  // }

  // editOffer(offer) {
  //   const { offerID, from, until, budget} = offer;
  //   return this.offers.put(`/offer/${offerID}`, {from, until, budget})
  //     .then(({ data }) => data)
  // }


}

const bid = new Bid();

export default bid
