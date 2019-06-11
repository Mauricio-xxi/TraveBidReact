import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import Link from '@material-ui/core/Link';
// import AuthProvider from '../lib/AuthProvider';
import TabComponent from "../components/uiStyle/TabComponent";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    color:"white",
    textShadow:"1px 1px 9px rgba(0, 0, 0, 0.87)",
    backgroundColor: theme.palette.background.paper,
    backgroundImage:'url("https://cdn.pixabay.com/photo/2016/03/28/09/34/bedroom-1285156_960_720.jpg")',
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    backgroundPosition:"bottom",
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  footerDiv: {
    display:"flex",
    justifyContent:"space-around",
  }
}));

const cards = [
  {image:"https://cdn.pixabay.com/photo/2014/11/30/20/46/sagrada-familia-552084_960_720.jpg",name:"Barcelona", text:"Dive into this vibrant and sunbathed city."},
   {image:"https://cdn.pixabay.com/photo/2017/06/11/18/03/london-2393098_960_720.jpg", name:"London", text:"Cosy pubs, green parks and sheer diversity in the British capital."},
    {image:"https://cdn.pixabay.com/photo/2017/12/31/10/26/berlin-3051937_960_720.jpg", name:"Berlin", text:"Jump into the city that never sleeps."}
  ];

export default function Landing() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            TravelBID
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="inherit" gutterBottom>
            TravelBID
            </Typography>
            <Typography variant="h5" align="center" color="inherit" paragraph>
            The safest and most affordable way to travel. TravelBID is an open platform enabling users to offer and find short stay accommodation around the world. 
            </Typography>
            <Typography variant="h4" align="center" color="inherit" paragraph>
              Because happiness is a way of travel, not a destination. Join!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" href="/login">
                    Login
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" href="/signup">
                    Signup
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
        <Typography component="h3" variant="h3" align="center" color="textPrimary" gutterBottom>
        Discover our top cities
        </Typography>
        <Typography component="h5" variant="h5" align="center" color="textSecondary" gutterBottom>
        Start posting offers for your next travel destinations.
        </Typography>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map(card => (
              <Grid item key={card.name} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.image}
                    title={card.name}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography>
                      {card.text}
                    </Typography>
                  </CardContent>
                  <CardActions>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

        <TabComponent/>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <div className={classes.footerDiv}>
          <img src="https://d1v3slut4s2mfy.cloudfront.net/d2a00aa42888a1536a76ca2b7610b8dc4a7bdd61/assets/icons/google-play.svg" alt="googleMarket"></img>
          <img src="https://d1v3slut4s2mfy.cloudfront.net/d2a00aa42888a1536a76ca2b7610b8dc4a7bdd61/assets/icons/apple-store.svg" alt="googleMarket"></img>
        </div>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        © TravelBID 2019 Inc.
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}