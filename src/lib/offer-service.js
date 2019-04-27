import axios from 'axios';

class Offer {
  constructor() {
    this.offers = axios.create({
      baseURL: process.env.REACT_APP_URL,
      withCredentials: true
    })
  }

  create(offer) {
    const { from, until, location, budget} = offer;
    return this.offers.post('/offer', { from, until, location, budget})
      .then(({ data }) => {
        return data
      })
  }

  showOfferList(userId) {
    return this.offers.get('/offer', userId)
      .then(({ data }) => data)
  }

  getOffer(offerID) {
    return this.offers.get(`/offer/${offerID}`)
      .then(({ data }) => data)
  }

  searchOffers (city) {
    return this.offers.get(`/offer/search/${city}`)
      .then(({ data }) => data )
  }

  deleteOffer(offerID) {
    return this.offers.delete(`/offer/${offerID}`)
      .then(({ data }) => data)
  }

  editOffer(offer) {
    const { offerID, from, until, budget} = offer;
    return this.offers.put(`/offer/${offerID}`, {from, until, budget})
      .then(({ data }) => data)
  }


}

const offer = new Offer();

export default offer
