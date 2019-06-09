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
        <p>Sign up, complete your profile and list your room</p>
        <h3>Step 2</h3>
        <p>Get personalised recommendations and room enquiries the same day.</p>
        <h3>Step 3</h3>
        <p>Accept or decline chat invites based on in-depth profiles, then get chatting!</p>
        </TabContainer>}
      {value === 1 && <TabContainer>
        <h3>Step 1</h3>
        <p>Sign up, complete your profile and get your room search underway.</p>
        <h3>Step 2</h3>
        <p>Find your ideal room and invite the landlord to chat</p>
        <h3>Step 3</h3>
        <p>As soon as the landlord accepts your invite, you can get chatting directly through the platform.</p>
        </TabContainer>}
    </div>
  );
}

export default TabComponent;
