// Global import of React.
import React, { Component } from 'react';
// Importing React Router to add page routes.
// So that we can link the main landing page with a specific page about a particular artwork.
// Import third-party routing library (react-router-dom)
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
// Import the main external css file for the app.
import './App.css';
// Import the containers/pages for the app
import Landing from './containers/Landing';
import Artwork from './containers/Artwork';
// Import the NavBar component
import NavBar from './components/NavBar';

// Class based React component for the main App component/container.
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <React.Fragment>
            <NavBar />
            <Switch>
              <Route exact path="/home" component={Landing} />
              <Route exact path="/home/artwork/:id" component={Artwork} />
            </Switch>
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

// export the App component.
export default App;
