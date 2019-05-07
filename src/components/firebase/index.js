import React, { Component } from 'react'
import * as firebase from 'firebase'

firebase.initializeApp({ 
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
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
      this.setState({
        uploadValue: percentage
      })
    }, (error) => {
      console.error(error.message)
    }, () => {
      task.snapshot.ref.getDownloadURL().then((downloadURL) => {
        this.props.getUrl(downloadURL)
        this.setState({
          picture: downloadURL
        })
      })
      // Upload complete
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