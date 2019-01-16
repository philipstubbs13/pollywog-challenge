// Global import of React so that we can use it.
// and add Suspense to add loading component while waiting to
// render/retrieve artwork from API request.
import React, { Component, Suspense } from 'react';
// import PropTypes for defining/checking component props.
import PropTypes from 'prop-types';
// import styling and components from material-ui library
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
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
  // Ths function handles clearing out the all the artwork currently stored
  // in indexed db when the user clicks the Explore More button.
  clearArtDb = () => {
    // ES6 destructuring
    const { artDB, handleGetRandomArtwork } = this.props;
    // Here, we are opening up the art_store db in indexeddb.
    artDB().then((db) => {
      // Then, starting a transaction to update the random_art object in the db.
      const txxx = db.transaction('random_art', 'readwrite');
      // We want to clear/remove the art stored in indexeddb.
      txxx.objectStore('random_art').clear();
      // After the transaction is complete,
      // Get new, random artwork from API and store in indexeddb.
      txxx.complete.then(() => {
        handleGetRandomArtwork();
      });
    });
  }

  render() {
    // ES6 destructuring
    const {
      classes,
      artItems,
    } = this.props;
    return (
      <div>
        <Typography variant="h4" className={classes.landingTitle}>
          Explore art from around the world
        </Typography>
        {/* If the ArtItemsList is not yet loaded by the time Landing page renders,
        show some fallback content while we’re waiting for it to load.
         This is done using the Suspense component */}
        <Suspense fallback={<Loading />}>
          <ArtItemsList
            artItems={artItems}
            clearArtDb={this.clearArtDb}
          />
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
  artDB: PropTypes.func.isRequired,
};

// export the component from this file.
export default withStyles(styles)(Landing);
