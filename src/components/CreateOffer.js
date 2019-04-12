import React, { Component } from 'react';

class AddProject extends Component {
  constructor(props) {
      super(props);
      this.state = { 
        location: "", 
        budget: "" 
      };
  }
   
  // handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   const title = this.state.title;
  //   const description = this.state.description;
  //   // axios.post("http://localhost:5000/api/projects", { title, description })
  //   .then( () => {
  //       this.props.getData();
  //       this.setState({title: "", description: ""});
  //   })
  //   .catch( error => console.log(error) )
  // }

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  render() {
    return(
      <div>
       <form onSubmit={this.handleFormSubmit}>
         <label>Location:</label>
         <input type="text" name="location" value={this.state.title} onChange={e => this.handleChangeTitle(e)}/>
         <label>Budget:</label>
         <input type="number" name="budget" value={this.state.description} onChange={e => this.handleChangeDesc(e)} />
         <input type="submit" value="Submit" />
       </form>
      </div>
    )
  }
}

export default AddProject;