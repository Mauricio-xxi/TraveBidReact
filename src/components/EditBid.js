import React, { Component } from 'react';
import bid from '../lib/bid-service';

class EditBid extends Component {
  constructor(props) {
      super(props);
      this.state = {
        description: this.props.descriptions, 
        value: this.props.values, 
      };
  }

  componentDidMount() {
    this.setState({
      description: this.props.description, 
      value: this.props.value, 
    });
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const bidID = this.props.bidID;
    const { description, value } = this.state;
    bid.editBid({ bidID, description, value  })
    .then( () => {
        this.props.getBids()
        this.setState({
          description: this.props.descriptions, 
          value: this.props.values, 
        })
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
      const { name, value } = event.target;
      this.setState({[name]: value})
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
         <label>Description:</label>
         <input type="text" name="description"  onChange={e => this.handleChange(e)}/>
         <label>Value:</label>
         <input type="number" name="value" onChange={e => this.handleChange(e)} />
         <input type="submit" value="Submit" />
       </form>
      </div>
    )
  }
}

export default EditBid;