// Global import of React.
import React, { Component } from 'react';
// import styling and components from material-ui library
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// CSS in JS
const styles = () => ({
  artworkContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  artItem: {
    marginTop: 20,
    flex: 1,
  },
  artImage: {
    border: '1px solid var(--app-dark-color)',
    width: '300px',
    height: '300px',
  },
});

// Class based React component for the Artwork Details page/container
class Artwork extends Component {
  // Initial state
  state = {
    error: '',
  }

  render() {
    // ES6 destructuring
    const { classes} = this.props;
    console.log(this.props);
    const { artItems } = this.props.location.state;
    // Grab the id of the specific artwork from props/url
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        {artItems.filter(item => item._source.id == id).map(item => (
          <div className={classes.artworkContainer}>
            <div>
              <img
                src={`https://1.api.artsmia.org/${id}.jpg`}
                alt={item._source.title}
              />
            </div>
          </div>
        ))} 
      </React.Fragment>
    );
  }
}

// export the component from this file.
export default withStyles(styles)(Artwork);
