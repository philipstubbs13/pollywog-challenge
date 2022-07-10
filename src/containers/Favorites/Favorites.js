import React, { Suspense, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';;
import { UiLoading } from '../../components/ui-loading/UiLoading';
import { UiArtItemsList } from '../../components/ui-art-items-list/UiArtItemsList'
import { useFavoritesStyles } from './Favorites.styles';

export const Favorites = (props) => {
  const classes = useFavoritesStyles();
  const [favoriteItems, setFavoriteItems] = useState([])

  useEffect(() => {
    props.artFavoritesDB().then(db => db.transaction('favorite_art')
      .objectStore('favorite_art').getAll()).then((obj) => {
      if (obj.length) {
        setFavoriteItems(obj)
      }
    });
  }, []) 

  return (
    <div>
      {favoriteItems.length ? (
        <div className={classes.favoritesContainer}>
          <Typography variant="h2" className={classes.favoritesTitle}>
            My favorites
          </Typography>
          <Suspense fallback={<UiLoading />}>
            <UiArtItemsList
              artItems={favoriteItems}
              numberArt={10000}
              isLoading={props.isLoading}
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

Favorites.propTypes = {
  artFavoritesDB: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
