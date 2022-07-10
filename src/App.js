import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import idb from 'idb';
import  { MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { Landing }from './containers/landing/Landing';
import { Artwork } from './containers/artwork/Artwork';
import { Favorites } from './containers/favorites/Favorites';
import { About } from './containers/about/About';
import { Help } from './containers/help/Help';
import { NoMatch } from './containers/no-match/NoMatch';
import { UiNavBar } from './components/ui-nav-bar/UiNavBar';
import { UiFooter } from './components/ui-footer/UiFooter';
import { useAppStyles } from './App.styles';
import { Box } from '@material-ui/core';
import { theme } from './theme/theme';

const uuidv1 = require('uuid/v1');

export const App = () => {
  const classes = useAppStyles();
  const [artItems, setArtItems] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleGetRandomArtwork();
  }, [])

  const handleGetRandomArtwork = () => {
    artDB().then((db) => db.transaction('random_art')
      .objectStore('random_art').getAll()).then((obj) => {
      if (obj.length === 0) {
        artDB().then((db) => {
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
                setIsLoading(false);
              });
            })
            // eslint-disable-next-line react/no-unused-state
            .catch((error) => setError(error));
          // };
        });
      } else {
        setArtItems(obj[0].artItems);
        setIsLoading(false);
      }
    });
  };

  const artDB = () => idb.open('art_store', 1, (upgradeDb) => {
    // eslint-disable-next-line default-case
    switch (upgradeDb.oldVersion) {
      case 0: upgradeDb.createObjectStore('random_art', { keyPath: 'id' });
    }
  });

  const artFavoritesDB = () => idb.open('art_favorite_store', 1, (upgradeDb) => {
    // eslint-disable-next-line default-case
    switch (upgradeDb.oldVersion) {
      case 0: upgradeDb.createObjectStore('favorite_art', { keyPath: '_id' });
    }
  });

  return (
    <div className="App">
      <Router>
        <div>
          <MuiThemeProvider theme={theme}>
            <Box display={'flex'} flexDirection={'column'}>
              <UiNavBar />
              <div className={classes.appPages}>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={(props) => (
                      <Landing
                        {...props}
                        handleGetRandomArtwork={handleGetRandomArtwork}
                        artItems={artItems}
                        artDB={artDB}
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
                        artFavoritesDB={artFavoritesDB}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/favorites"
                    render={(props) => (
                      <Favorites
                        {...props}
                        artFavoritesDB={artFavoritesDB}
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
            </Box>
          </MuiThemeProvider>
        </div>
      </Router>
    </div>
  );
}
