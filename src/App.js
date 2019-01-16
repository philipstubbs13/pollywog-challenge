// Global import of React.
import React, { Component } from 'react';
// import PropTypes for defining/checking component props.
import PropTypes from 'prop-types';
// Importing React Router to add page routes.
// So that we can link the main landing page with a specific page about a particular artwork.
// Import third-party routing library (react-router-dom)
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
// import IndexedDB Promised
// This is a tiny library that mirrors IndexedDB,
// but replaces the weird IDBRequest objects with promises,
// plus a couple of other small changes.
import idb from 'idb';
// Import styling and components from material ui library.
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// Import the main external css file for the app.
import './App.css';
// Import the containers/pages for the app
import Landing from './containers/Landing';
import Artwork from './containers/Artwork';
import Favorites from './containers/Favorites';
// Import the NavBar component
import NavBar from './components/NavBar';
// Import the Footer component
import Footer from './components/Footer';

// Using uuid/v1 package to generate a random id
// for storing objects in IndexedDB.
const uuidv1 = require('uuid/v1');

// CSS in JS
const styles = () => ({
  appPages: {
    margin: '4rem',
    minHeight: 'calc(100vh - 300px)',
  },
});

const theme = createMuiTheme({
  palette: {
    type: 'light', // Switching the dark mode on is a single property value change.
  },
  typography: {
    // In Japanese the characters are usually larger.
    fontSize: 12,
    useNextVariants: true,
  },
});

// Class based React component for the main App component/container.
class App extends Component {
  state = {
    artItems: [],
    // eslint-disable-next-line react/no-unused-state
    error: '',
  }

  // When the component mounts.
  componentDidMount() {
    this.handleGetRandomArtwork();
  }

  // This function handles getting random art from IndexedDB(if exists)
  // or from the API.
  handleGetRandomArtwork = () => {
    // Open the artDB in IndexedDB.
    this.artDB().then(db => db.transaction('random_art')
      // get random art info from the IndexedDB store.
      .objectStore('random_art').getAll()).then((obj) => {
      // If there is no art currently in the store (new user)...
      if (obj.length === 0) {
        // Open up IndexedDB and then perform GET request to get art from API.
        this.artDB().then((db) => {
          // This function will get ten random artworks from the collection
          // and information about each artwork.
          // url endpoint for getting random art.
          const url = 'https://search.artsmia.org/random/art?size=70';
          // Make GET request using fetch API.
          // eslint-disable-next-line no-undef
          fetch(url, {
            method: 'GET',
          })
            .then(response => response.json()).then((data) => {
              // Create transaction to access IndexedDB.
              // Add artwork from API response to object store in IndexedDB.
              const tx = db.transaction('random_art', 'readwrite');
              tx.objectStore('random_art').put({
                artItems: data,
                id: uuidv1(),
              });
              // After the transaction is complete, refresh.
              tx.complete.then(() => {
                // eslint-disable-next-line no-undef
                window.location.reload();
              });
            })
            // If there is an error, catch the error and save to component state.
            // eslint-disable-next-line react/no-unused-state
            .catch(error => this.setState({ error }));
          // };
        });
      } else {
        // If there is already art available/stored in IndexedDB,
        // then, there is no need to perform GET request to API.
        // Just add the art stored in IndexedDB to the component state.
        this.setState({ artItems: obj[0].artItems });
      }
    });
  }

  // Function to open art_store db in IndexedDB
  // and upgrade db if necessary.
  // key path is randomly generated id using the uuid npm package.
  artDB = () => idb.open('art_store', 1, (upgradeDb) => {
    // eslint-disable-next-line default-case
    switch (upgradeDb.oldVersion) {
      case 0: upgradeDb.createObjectStore('random_art', { keyPath: 'id' });
    }
  })

  // Function to open art_favorite_store db in IndexedDB
  // and upgrade db if necessary.
  // key path is the id of the artwork provided by the API.
  artFavoritesDB = () => idb.open('art_favorite_store', 1, (upgradeDb) => {
    // eslint-disable-next-line default-case
    switch (upgradeDb.oldVersion) {
      case 0: upgradeDb.createObjectStore('favorite_art', { keyPath: '_id' });
    }
  })


  render() {
    // ES6 destructuring
    const { classes } = this.props;
    const { artItems } = this.state;
    return (
      <div className="App">
        <Router>
          <React.Fragment>
            <MuiThemeProvider theme={theme}>
              <NavBar />
              <div className={classes.appPages}>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={props => (
                      <Landing
                        {...props}
                        handleGetRandomArtwork={this.handleGetRandomArtwork}
                        artItems={artItems}
                        artDB={this.artDB}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/artwork/:id"
                    render={props => (
                      <Artwork
                        {...props}
                        artItems={artItems}
                        artFavoritesDB={this.artFavoritesDB}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/favorites"
                    render={props => (
                      <Favorites
                        {...props}
                        artFavoritesDB={this.artFavoritesDB}
                      />
                    )}
                  />
                </Switch>
              </div>
              <Footer />
            </MuiThemeProvider>
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

// Document/check prop types
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export the App component.
export default withStyles(styles)(App);
