import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import offer from '../../lib/offer-service';
import Card from "../../components/Card";



class SearchOffers extends Component {
  constructor(props){
    super(props);
    this.state = {
        searchResults: [],
        location: this.props.user.city,
        showSearchResults: true,
    }
  }

  renderSearchResults = (e) => {
    this.setState({
      showSearchResults: !this.state.showSearchResults
     })
  }

  
  search = () => {
    offer.searchOffers(this.state.location)
    .then(responseData => {
        this.setState({
          searchResults: responseData
        })
    })
    .catch( error => console.log(error) )
  }


  componentDidMount = ()=> {
    this.search();
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { showSearchResults, searchResults } = this.state;
    return (
      <div>
       <button onClick={this.renderSearchResults}>
        { showSearchResults ? 'View offers in your town' : 'Hide'}
        </button>
        { !showSearchResults ? <Card searchResults={searchResults}/> : <div></div>}
      </div>
      
    );
  }
}

export default withAuth(SearchOffers);
