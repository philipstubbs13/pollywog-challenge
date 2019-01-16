// Global import of React so that we can use it.
import React, { Component } from 'react';
// import PropTypes for defining/checking component props.
import PropTypes from 'prop-types';
// import react-router-dom library for linking and defining routes.
import { Link } from 'react-router-dom';
// import styling and components from material-ui library
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import external css file
import './ArtItemsList.css';

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
});

// Class based React component for Landing page/container.
class ArtItemsList extends Component {
  // If an artwork does not have an image available,
  // use the default/placeholder image instead.
  addDefaultSrc(ev) {
    ev.target.src = 'https://1.api.artsmia.org/15790.jpg';
  }

  render() {
    // ES6 destructuring
    const {
      classes,
      artItems,
      numberArt,
    } = this.props;
    console.log(artItems);
    return (
      <div>
        <div className={classes.artContainer}>
          {/* Here, we are filtering out invalid images
          and images that aren't publicly accessible */}
          {/* Then, we are grabbing the first ten using the splice method. */}
          {/* Finally, we are using the map method to map over the art
          and render the art to the page. */}
          {artItems.filter(item => item._source.image === 'valid' && item._source.public_access === '1').splice(0, numberArt).map(item => (
            <div className={classes.artItem} key={item._source.id}>
              <Link to={{ pathname: `/artwork/${item._source.id}`, state: { artItems } }}>
                <div className="image">
                  <img onError={this.addDefaultSrc} src={`https://1.api.artsmia.org/${item._source.id}.jpg`} alt={item._source.title} className="artImage" />
                  <div className="art-title">
                    <Typography variant="h6">{item._source.title}</Typography>
                    {/* If the artwork has audio... */}
                    {item._source.hasOwnProperty(['related:audio-stops']) && (
                      <Typography variant="h6"><i className="fas fa-volume-up" /> Contains audio</Typography>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// Document/check prop types
ArtItemsList.propTypes = {
  classes: PropTypes.object.isRequired,
  clearArtDb: PropTypes.func.isRequired,
  artItems: PropTypes.array.isRequired,
};

// export the component from this file.
export default withStyles(styles)(ArtItemsList);
