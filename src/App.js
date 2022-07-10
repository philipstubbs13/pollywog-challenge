import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import idb from 'idb';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import Landing from './containers/Landing';
import Artwork from './containers/Artwork';
import { Favorites } from './containers/favorites/Favorites';
import { About } from './containers/about/About';
import { Help } from './containers/help/Help';
import { NoMatch } from './containers/no-match/NoMatch';
import { UiNavBar } from './components/ui-nav-bar/UiNavBar';
import { UiFooter } from './components/ui-footer/UiFooter';

const uuidv1 = require('uuid/v1');

const styles = () => ({
  appPages: {
    margin: '2.4rem',
    minHeight: 'calc(100vh - 350px)',
  },
});

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#263238',
    },
    secondary: {
      main: '#fff',
    },
  },
  typography: {
    fontSize: 12,
    useNextVariants: true,
  },
});

class App extends Component {
  state = {
    artItems: [],
    // eslint-disable-next-line react/no-unused-state
    error: '',
    isLoading: true,
  };

  componentDidMount() {
    this.handleGetRandomArtwork();
  }

  handleGetRandomArtwork = () => {
    this.artDB().then((db) => db.transaction('random_art')
      .objectStore('random_art').getAll()).then((obj) => {
      if (obj.length === 0) {
        this.artDB().then((db) => {
          const url = 'https://search.artsmia.org/random/art?size=90';
          // eslint-disable-next-line no-undef
          fetch(url, {
            method: 'GET',
          })
            .then((response) => response.json()).then((data) => {
              const tx = db.transaction('random_art', 'readwrite');
              tx.objectStore('random_art').put({
                artItems: data,
                id: uuidv1(),
              });
              tx.complete.then(() => {
                // eslint-disable-next-line no-undef
                window.location.reload();
                this.setState({ isLoading: false });
              });
            })
            // eslint-disable-next-line react/no-unused-state
            .catch((error) => this.setState({ error }));
          // };
        });
      } else {
        this.setState({
          artItems: obj[0].artItems,
          isLoading: false,
        });
      }
    });
  };

  artDB = () => idb.open('art_store', 1, (upgradeDb) => {
    // eslint-disable-next-line default-case
    switch (upgradeDb.oldVersion) {
      case 0: upgradeDb.createObjectStore('random_art', { keyPath: 'id' });
    }
  });

  artFavoritesDB = () => idb.open('art_favorite_store', 1, (upgradeDb) => {
    // eslint-disable-next-line default-case
    switch (upgradeDb.oldVersion) {
      case 0: upgradeDb.createObjectStore('favorite_art', { keyPath: '_id' });
    }
  });

  render() {
    const { classes } = this.props;
    const { artItems, isLoading } = this.state;
    return (
      <div className="App">
        <Router>
          <div>
            <MuiThemeProvider theme={theme}>
              <UiNavBar />
              <div className={classes.appPages}>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={(props) => (
                      <Landing
                        {...props}
                        handleGetRandomArtwork={this.handleGetRandomArtwork}
                        artItems={artItems}
                        artDB={this.artDB}
                        isLoading={isLoading}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/artwork/:id"
                    render={(props) => (
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
                    render={(props) => (
                      <Favorites
                        {...props}
                        artFavoritesDB={this.artFavoritesDB}
                        isLoading={isLoading}
                      />
                    )}
                  />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/help" component={Help} />
                  <Route component={NoMatch} />
                </Switch>
              </div>
              <UiFooter />
            </MuiThemeProvider>
          </div>
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
