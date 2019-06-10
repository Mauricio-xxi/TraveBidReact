import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withAuth } from '../../lib/AuthProvider';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display:"flex",
    justifyContent:"space-around",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textAlign:"center",
    flexGrow: 1,
  },
  menuIcon:{
    color:"white"
  }
}));

function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <Button  aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      <MenuIcon  color="inherit"/>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem><Link  to="/profile">Profile</Link></MenuItem>
        <MenuItem><p onClick={props.logout}>Logout</p></MenuItem>
      </Menu>
    </div>
  );
}


function NavBarUI(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            <SimpleMenu className={classes.buttonIcon} logout={props.logout}/>
          <Typography variant="h6" className={classes.title}>
            TravelBid
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withAuth(NavBarUI)