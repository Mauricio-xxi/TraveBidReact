import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop:"30px",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function TabComponent() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <Typography component="h3" variant="h3" align="center" color="textPrimary" gutterBottom>
          How it works
      </Typography>
      <AppBar position="static">
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <LinkTab label="RENT OUT A ROOM" href="/drafts" />
          <LinkTab label="FIND A ROOM" href="/trash" />
        </Tabs>
      </AppBar>
      {value === 0 && <TabContainer>
        <h3>Step 1</h3>
        <p>Sign up, complete your profile and list your room.</p>
        <h3>Step 2</h3>
        <p>Find offers posted by travelers and bid on them.</p>
        <h3>Step 3</h3>
        <p>Once your bid has been accepted by the traveler you can get chatting to close all arrangements.</p>
        </TabContainer>}
      {value === 1 && <TabContainer>
        <h3>Step 1</h3>
        <p>Sign up, complete your profile and get your room search underway.</p>
        <h3>Step 2</h3>
        <p>Create offers to all your travel destinations indicating: location, budget and dates.</p>
        <h3>Step 3</h3>
        <p>Sit back, relax, and wait for all the bidders offering accomodation.</p>
        <h3>Step 4</h3>
        <p>Accept or decline bids based on price, geolocation and facilities offered by the bidder.</p>
        </TabContainer>}
    </div>
  );
}

export default TabComponent;
