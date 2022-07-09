import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Loading from '../../components/Loading';
const ArtItemsList = React.lazy(() => import('../../components/ArtItemsList'));

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

class Favorites extends Component {
  state = {
    favoriteItems: [],
  }

  componentDidMount() {
    const { artFavoritesDB } = this.props;
    artFavoritesDB().then(db => db.transaction('favorite_art')
      .objectStore('favorite_art').getAll()).then((obj) => {
      if (obj.length) {
        this.setState({
          favoriteItems: obj,
        });
      }
    });
  }

  render() {
    const { classes, isLoading } = this.props;
    const { favoriteItems } = this.state;
    return (
      <div>
        {favoriteItems.length ? (
          <div className={classes.favoritesContainer}>
            <Typography variant="h2" className={classes.favoritesTitle}>
              My favorites
            </Typography>
            <Suspense fallback={<Loading />}>
              <ArtItemsList
                artItems={favoriteItems}
                numberArt={10000}
                isLoading={isLoading}
              />
            </Suspense>
          </div>
        ) : (
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

Favorites.propTypes = {
  classes: PropTypes.object.isRequired,
  artFavoritesDB: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Favorites);
