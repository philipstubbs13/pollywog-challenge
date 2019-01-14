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
import { withStyles } from '@material-ui/core/styles';
// Import the main external css file for the app.
import './App.css';
// Import the containers/pages for the app
import Landing from './containers/Landing';
import Artwork from './containers/Artwork';
// Import the NavBar component
import NavBar from './components/NavBar';

const styles = () => ({
  appPages: {
    margin: '4rem',
  },
});

// Class based React component for the main App component/container.
class App extends Component {
  render() {
    // ES6 destructuring
    const { classes } = this.props;
    return (
      <div className="App">
        <Router>
          <React.Fragment>
            <NavBar />
            <div className={classes.appPages}>
              <Switch>
                <Route exact path="/home" component={Landing} />
                <Route exact path="/home/artwork/:id" component={Artwork} />
              </Switch>
            </div>
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
