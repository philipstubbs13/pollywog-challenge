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
    error: '',
  }

  // When the component mounts to the page.
  componentDidMount() {
    // ES6 destructuring
    const { handleGetRandomArtwork } = this.props;
    // Get 10 random pieces of art.
    handleGetRandomArtwork();
  }

  // If an artwork does not have an image available,
  // use the default/placeholder image instead.
  addDefaultSrc(ev) {
    ev.target.src = 'https://1.api.artsmia.org/15790.jpg';
  }

  render() {
    // ES6 destructuring
    const { classes, artItems } = this.props;
    console.log(this.props);
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
              <Button component={Link} to={{ pathname: `/home/artwork/${item._source.id}`, state: { artItems } }}>
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
  handleGetRandomArtwork: PropTypes.func.isRequired,
  artItems: PropTypes.array.isRequired,
};

// export the component from this file.
export default withStyles(styles)(Landing);
