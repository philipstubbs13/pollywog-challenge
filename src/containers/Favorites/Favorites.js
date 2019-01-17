// Global import of React so that we can use it.
// and add Suspense to add loading component while waiting to
// render/retrieve artwork from store.
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
const styles = theme => ({
  favoritesTitle: {
    fontWeight: 'bold',
    color: theme.palette.common.black,
  },
  noFavorites: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 200,
  },
  favoritesContainer: {
    marginBottom: 200,
  },
  noFavoritesContent: {
    color: theme.palette.common.black,
  },
});

// Class based React component for Landing page/container.
class Favorites extends Component {
  state = {
    favoriteItems: [],
  }

  // When component mounts...
  componentDidMount() {
    // When App commpent mounts
    // Open the artFavoritesDB in IndexedDB.
    const { artFavoritesDB } = this.props;
    artFavoritesDB().then(db => db.transaction('favorite_art')
      // get favorited art from the IndexedDB store.
      .objectStore('favorite_art').getAll()).then((obj) => {
      // If the favorite art is available in the store,
      // Grab the art and add to App component state.
      if (obj.length) {
        this.setState({
          favoriteItems: obj,
        });
      }
    });
  }

  render() {
    // ES6 destructuring
    const { classes, isLoading } = this.props;
    const { favoriteItems } = this.state;
    return (
      <div>
        {/* If the favorites are not yet loaded by the time Favorites page renders,
        show some fallback content while we’re waiting for it to load.
        This is done using the Suspense component */}
        {favoriteItems.length ? (
          <div className={classes.favoritesContainer}>
            <Typography variant="h2" className={classes.favoritesTitle}>
              My favorites
            </Typography>
            <Suspense fallback={<Loading />}>
              <ArtItemsList
                artItems={favoriteItems}
                numberArt="10000"
                isLoading={isLoading}
              />
            </Suspense>
          </div>
        ) : (
          // If there are no favorites yet, display some default/placeholder text.
          <div className={classes.noFavorites}>
            <i className="far fa-star fa-4x" />
            <Typography variant="h3" className={classes.noFavoritesContent}>No favorites yet</Typography>
            <Typography variant="h6" className={classes.noFavoritesContent}>
              Use the  <i className="far fa-star" /> to mark any artwork as a favorite.
            </Typography>
            <Typography variant="h6" className={classes.noFavoritesContent}>
              Come back here to quickly access your favorites at anytime.
            </Typography>
          </div>
        )}
      </div>
    );
  }
}

// Document/check prop types
Favorites.propTypes = {
  classes: PropTypes.object.isRequired,
  artFavoritesDB: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

// export the component from this file.
export default withStyles(styles)(Favorites);
