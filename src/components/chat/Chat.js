import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import socketIO from 'socket.io-client';
// import {CTX} from './Store'

const useStyles = makeStyles(theme => ({
  root: {
    // margin: '15%',
    marginTop: '80px',
    height: 'auto',
    width: '100%',
    padding: theme.spacing(3, 2),
  },
  flex: {
    display: 'flex',
    alignItems:'center;'
  },
  // topicsWindow: {
  //   width: '30%',
  //   height: '300px',
  //   borderRight: '1px solid black',
  // },
  chatWindow: {
    width: '80vw',
    height: '100vw',
    padding: '20px',
  },
  chatbox: {
    width: '85%',
  },
  button: {
    width: '15%',
  },
}));


export default function Chat (props) {
  console.log(props)
  const classes = useStyles();

  // const messages = [];

  // function newMessage (message) {
  //   console.log('adding message')
  //   messages.push(message)
  //   console.log(messages)
  // }
  // CTX Store

  // const [ allChats ] = React.useContext(CTX);

  // console.log(allChats);

  const [textValue, changeTextValue ] = useState('');
  const [allChats, updateAllChats ] = useState('');
  const  currentUser = props.props.user.username; 

  useEffect(() => {
    const socket = socketIO(process.env.REACT_APP_URL);
    socket.emit('greet', data => {console.log(data)});
    socket.on('greet', data => {console.log(data)});
    socket.emit('message', { msg: textValue }, data => {console.log(data)} );
    socket.on('message', data => {console.log(data)});
  })

  return (

    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Talk to XXXX
        </Typography>
        <div className={classes.flex}>
          <div className={classes.chatWindow}>
              {
                [allChats].map((message, i) => (
                  <div className={classes.flex} key={i}>
                    <Chip label={currentUser} className={classes.chip} />
                    <Typography variant='h5' component="h5">
                      {message}
                    </Typography>
                  </div>
                ))
              }
          </div>
        </div>

        <div  className={classes.flex}>
          <TextField
            label="Send a chat"
            className={classes.chatbox}
            value={textValue}
            onChange={ e => changeTextValue(e.target.value)}
          />
          <Button 
            variant="contained" 
            color="primary" 
            className={classes.button}
            onClick={()=> updateAllChats(textValue)}
          >
            Send
          </Button>
        </div>
      </Paper>
    </div>
  )
}