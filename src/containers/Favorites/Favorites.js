import React, { Suspense, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { UiLoading } from '../../components/ui-loading/UiLoading';
import { UiArtItemsList } from '../../components/ui-art-items-list/UiArtItemsList';

export const Favorites = (props) => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const { artFavoritesDB, isLoading } = props;

  useEffect(() => {
    artFavoritesDB().then((db) => db.transaction('favorite_art')
      .objectStore('favorite_art').getAll()).then((obj) => {
      if (obj.length) {
        setFavoriteItems(obj);
      }
    });
  }, []);

  return (
    <div>
      {favoriteItems.length ? (
        <div>
          <Typography variant="h2">
            My favorites
          </Typography>
          <Suspense fallback={<UiLoading />}>
            <UiArtItemsList
              artItems={favoriteItems}
              numberArt={10000}
              isLoading={isLoading}
            />
          </Suspense>
        </div>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center">
          <i className="far fa-star fa-4x" />
          <Typography variant="h3">No favorites yet</Typography>
          <Typography variant="h6">
            Use the  <i className="far fa-star" /> to mark any artwork as a favorite.
          </Typography>
          <Typography variant="h6">
            Come back here to quickly access your favorites at anytime.
          </Typography>
        </Box>
      )}
    </div>
  );
};

Favorites.propTypes = {
  artFavoritesDB: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
