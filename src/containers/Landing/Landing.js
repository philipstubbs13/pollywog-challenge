// Global Import of React
import React, { Component } from 'react';
// import PropTypes for defining/checking component props.
import PropTypes from 'prop-types';
// import react-router-library for linking pages.
import { Link } from 'react-router-dom';
// import styling and components from material-ui library
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// CSS in JS
const styles = () => ({
  artContainer: {
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

// Class based React component for Landing page/container.
class Landing extends Component {
  // Initial state
  state = {
    artItems: [],
    error: '',
  }

  // When the component mounts to the page.
  componentDidMount() {
    // Get 10 random pieces of art.
    this.handleGetRandomArtwork();
  }

  // This function will get ten random artworks from the collection
  // and information about each artwork.
  handleGetRandomArtwork= () => {
    // url endpoint for getting random art.
    const url = 'https://search.artsmia.org/random/art?size=40';
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
      .catch(error => this.setState({ error }));
  };

  // If an artwork does not have an image available,
  // use the default/placeholder image instead.
  addDefaultSrc(ev) {
    ev.target.src = 'https://1.api.artsmia.org/15790.jpg';
  }

  render() {
    // ES6 destructuring
    const { classes } = this.props;
    const { artItems } = this.state;
    return (
      <div>
        <Typography variant="title">
          MyArtSearch
        </Typography>
        <div className={classes.artContainer}>
          {/* Here, we are filtering out invalid images
          and images that aren't publicly accessible */}
          {/* Then, we are grabbing the first ten using the splice method. */}
          {/* Finally, we are using the map method to map over the art
          and render the art to the page. */}
          {artItems.filter(item => item._source.image === 'valid' && item._source.public_access === '1').splice(0, 10).map(item => (
            <div className={classes.artItem} key={item._source.id}>
              <Button component={Link} to={`/home/artwork/${item._source.id}`}>
                <img onError={this.addDefaultSrc} src={`https://1.api.artsmia.org/${item._source.id}.jpg`} alt={item._source.title} className={classes.artImage} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// Document/check prop types
Landing.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export the component from this file.
export default withStyles(styles)(Landing);
