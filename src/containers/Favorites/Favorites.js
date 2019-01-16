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
  favoritesTitle: {
    fontWeight: 'bold',
  },
  noFavorites: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
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
        })
      }
    });
  }

  render() {
    // ES6 destructuring
    const { classes } = this.props;
    const { favoriteItems } = this.state;
    console.log(favoriteItems);
    return (
      <div>
        {/* If the favorites are not yet loaded by the time Favorites page renders,
        show some fallback content while we’re waiting for it to load.
        This is done using the Suspense component */}
        {favoriteItems.length ? (
          <React.Fragment>
            <Typography variant="h2" className={classes.favoritesTitle}>
              My favorites
            </Typography>
            <Suspense fallback={<Loading />}>
              <ArtItemsList
                artItems={favoriteItems}
                numberArt="10000"
              />
            </Suspense>
          </React.Fragment>
        ) : (
          <div className={classes.noFavorites}>
            <i className="far fa-star fa-4x" />
            <Typography variant="h3">No favorites yet</Typography>
            <Typography variant="h6">
              Use the  <i className="far fa-star" /> to mark any artwork as a favorite.
            </Typography>
            <Typography variant="h6">
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
  artItems: PropTypes.array.isRequired,
  artDB: PropTypes.func.isRequired,
};

// export the component from this file.
export default withStyles(styles)(Favorites);
