// Global import of React so that we can use it.
import React, { Component } from 'react';
// import PropTypes for defining/checking component props.
import PropTypes from 'prop-types';
// import react-router-dom library for linking and defining routes.
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
  landingTitle: {
    fontWeight: 'bold',
  },
  loadMoreArt: {
    marginTop: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  exploreMoreBtn: {
    marginTop: 15,
  },
});

// Class based React component for Landing page/container.
class Landing extends Component {
  // Initial state
  state = {
    numberArt: 10,
  }

  // When the component mounts to the page.
  componentDidMount() {
    // ES6 destructuring
    const { handleGetRandomArtwork } = this.props;
    // Get 10 random pieces of art.
    handleGetRandomArtwork();
  }

  // Ths function handles loading more artwork
  // when the user clicks load more at the bottom of the page.
  toggleLoadMore = () => {
    // ES6 destructuring
    const { numberArt } = this.state;
    // numberArt determines how many artworks to render on the Landing page.
    this.setState({ numberArt: numberArt + 4 });
  }

  // If an artwork does not have an image available,
  // use the default/placeholder image instead.
  addDefaultSrc(ev) {
    ev.target.src = 'https://1.api.artsmia.org/15790.jpg';
  }

  render() {
    // ES6 destructuring
    const { classes, artItems, handleGetRandomArtwork } = this.props;
    const { numberArt } = this.state;
    return (
      <div>
        <Typography variant="h4" className={classes.landingTitle}>
          Explore art from around the world
        </Typography>
        {/* When user clicks the Explore more button on the Landing page. */}
        {/* Fetch 10 different random artworks from the API. */}
        <Button variant="contained" className={classes.exploreMoreBtn} color="primary" size="large" onClick={() => handleGetRandomArtwork()}>
          Explore more
        </Button>
        <div className={classes.artContainer}>
          {/* Here, we are filtering out invalid images
          and images that aren't publicly accessible */}
          {/* Then, we are grabbing the first ten using the splice method. */}
          {/* Finally, we are using the map method to map over the art
          and render the art to the page. */}
          {artItems.filter(item => item._source.image === 'valid' && item._source.public_access === '1').splice(0, numberArt).map(item => (
            <div className={classes.artItem} key={item._source.id}>
              <Link to={{ pathname: `/home/artwork/${item._source.id}`, state: { artItems } }}>
                <img onError={this.addDefaultSrc} src={`https://1.api.artsmia.org/${item._source.id}.jpg`} alt={item._source.title} className={classes.artImage} />
              </Link>
              {/* If the artwork has audio... */}
              {item._source.hasOwnProperty(['related:audio-stops']) && (
                <Button>Audio</Button>
              )}
            </div>
          ))}
        </div>
        {/* The Load more button at the bottom of the page gives the user */}
        {/* option to load more. */}
        <div className={classes.loadMoreArt}>
          <Button variant="contained" color="primary" size="large" onClick={() => this.toggleLoadMore()}>
            Load more
          </Button>
        </div>
      </div>
    );
  }
}

// Document/check prop types
Landing.propTypes = {
  classes: PropTypes.object.isRequired,
  handleGetRandomArtwork: PropTypes.func.isRequired,
  artItems: PropTypes.array.isRequired,
};

// export the component from this file.
export default withStyles(styles)(Landing);
