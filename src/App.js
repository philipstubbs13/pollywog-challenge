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
// Import styling and components from material ui library.
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// Import the main external css file for the app.
import './App.css';
// Import the containers/pages for the app
import Landing from './containers/Landing';
import Artwork from './containers/Artwork';
// Import the NavBar component
import NavBar from './components/NavBar';
// Import the Footer component
import Footer from './components/Footer';

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

  // This function will get ten random artworks from the collection
  // and information about each artwork.
  handleGetRandomArtwork= () => {
    // url endpoint for getting random art.
    const url = 'https://search.artsmia.org/random/art?size=70';
    // Make GET request using fetch API.
    // eslint-disable-next-line no-undef
    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json()).then((data) => {
        // After we get the art back, save the artwork to the component state.
        this.setState({ artItems: data });
        // eslint-disable-next-line no-console
        console.log(data);
      })
      // If there is an error, catch the error and save to component state.
      // eslint-disable-next-line react/no-unused-state
      .catch(error => this.setState({ error }));
  };

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
                    path="/home"
                    render={props => (
                      <Landing
                        {...props}
                        handleGetRandomArtwork={this.handleGetRandomArtwork}
                        artItems={artItems}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/home/artwork/:id"
                    render={props => (
                      <Artwork
                        {...props}
                        artItems={artItems}
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
