// Global import of React so that we can use it.
// and add Suspense to add loading component while waiting to
// render/retrieve artwork from API request.
import React, { Component, Suspense } from 'react';
// import PropTypes for defining/checking component props.
import PropTypes from 'prop-types';
// import styling and components from material-ui library
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import the Loading component
import Loading from '../../components/Loading';
// import the ArtItemsList component using lazy loading.
const ArtItemsList = React.lazy(() => import('../../components/ArtItemsList'));

// CSS in JS
const styles = () => ({
  landingTitle: {
    fontWeight: 'bold',
  },
});

// Class based React component for Landing page/container.
class Landing extends Component {
  // When the component mounts to the page.
  componentDidMount() {
    // ES6 destructuring
    const { handleGetRandomArtwork, artDB } = this.props;
    // Get 10 random pieces of art.
    // handleGetRandomArtwork();
  }

  clearArtDb = () => {
    const { artDB, handleGetRandomArtwork } = this.props;
    artDB().then((db) => {
      const txxx = db.transaction('random_art', 'readwrite');
      txxx.objectStore('random_art').clear();
      txxx.complete.then(() => {
        handleGetRandomArtwork();
      });
    });
  }

  render() {
    // ES6 destructuring
    const { classes, artItems, clearArtDb, artFavoritesDB } = this.props;
    return (
      <div>
        <Typography variant="h4" className={classes.landingTitle}>
          Explore art from around the world
        </Typography>
        {/* If the ArtItemsList is not yet loaded by the time Landing pagerenders,
        show some fallback content while we’re waiting for it to load.
         This is done using the Suspense component */}
        <Suspense fallback={<Loading />}>
          <ArtItemsList artItems={artItems} clearArtDb={this.clearArtDb} artFavoritesDB={artFavoritesDB} />
        </Suspense>
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
