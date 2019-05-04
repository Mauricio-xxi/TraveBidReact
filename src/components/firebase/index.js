import React, { Component } from 'react'
import * as firebase from 'firebase'

firebase.initializeApp({
  apiKey: "AIzaSyCIZeYGN84Y4USmGRs0GmJLywFJewPGsjo",
  authDomain: "travelbid-1552229318200.firebaseapp.com",
  databaseURL: "https://travelbid-1552229318200.firebaseio.com",
  projectId: "travelbid-1552229318200",
  storageBucket: "travelbid-1552229318200.appspot.com",
  messagingSenderId: "357225272013",
  appId: "1:357225272013:web:6b4b08108dba91db"
})

class FileUpload extends Component {
  constructor () {
    super()
    this.state = {
      uploadValue: 0,
      picture: " "
    }
  }

  handleOnChange (e) {
    const file = e.target.files[0]
    const storageRef = firebase.storage().ref(`profile/${file.name}`)
    const task = storageRef.put(file)

    task.on('state_changed', (snapshot) => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log(snapshot)
      this.setState({
        uploadValue: percentage
      })
    }, (error) => {
      console.error(error.message)
    }, () => {
      task.snapshot.ref.getDownloadURL().then((downloadURL) => {
        this.setState({
          picture: downloadURL
        })
      })
      // Upload complete
      
      console.log(this.state)
    })
  }

  render () {
    return (
      <div>
        <progress value={this.state.uploadValue} max='100'>
          {this.state.uploadValue} %
        </progress>
        <br />
        <input type='file' onChange={this.handleOnChange.bind(this)}/>
        <br />
        <img width='90' src={this.state.picture} alt = "avatar"/>
      </div>
    )
  }
}

export default FileUpload