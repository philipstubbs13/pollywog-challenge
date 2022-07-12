import React, { useState, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button } from '@material-ui/core';
import { UiLoading } from '../../components/ui-loading/UiLoading';
import { UiArtItemsList } from '../../components/ui-art-items-list/UiArtItemsList';
import { useLandingStyles } from './Landing.styles';

export const Landing = (props) => {
  const classes = useLandingStyles();
  const [numberArt, setNumberArt] = useState(10);
  const [, setItemsWithAudio] = useState([]);
  const [hasAudio, setHasAudio] = useState(false);
  const { artDB, handleGetRandomArtwork, artItems } = props;

  const clearArtDb = () => {
    artDB().then((db) => {
      const txxx = db.transaction('random_art', 'readwrite');
      txxx.objectStore('random_art').clear();
      txxx.complete.then(() => {
        handleGetRandomArtwork();
      });
    });
  };

  const toggleLoadMore = () => {
    setNumberArt((previousNumberArt) => previousNumberArt + 4);
  };

  const filterAudio = () => {
    const totalValidItems = artItems.filter((item) => item._source.image === 'valid' && item._source.public_access === '1');
    const itemsWithAudio = totalValidItems.filter((item) => item._source.hasOwnProperty(['related:audio-stops']));
    setItemsWithAudio(itemsWithAudio);
    setHasAudio(true);
  };

  const clearAudioFilter = () => {
    setHasAudio(false);
  };

  const totalValidItems = artItems.filter((item) => item._source.image === 'valid' && item._source.public_access === '1');
  const hasAudioItemsCount = totalValidItems.filter((item) => item._source.hasOwnProperty(['related:audio-stops']));

  return (
    <Box>
      <Typography variant="h2" className={classes.landingTitle}>
        Explore Art
      </Typography>
      <div className={classes.buttons}>
        <Button variant="contained" color="primary" size="large" onClick={clearArtDb}>
          Explore more
        </Button>
        {hasAudioItemsCount.length > 0 && !hasAudio && (
          <Button variant="contained" color="primary" size="large" onClick={filterAudio}>
            Has Audio
          </Button>
        )}
        {hasAudio && (
          <Button variant="contained" color="primary" size="large" onClick={clearAudioFilter}>
            Clear audio filter
          </Button>
        )}
      </div>
      {hasAudio && (
        <Suspense fallback={<UiLoading />}>
          <UiArtItemsList
            artItems={hasAudioItemsCount}
            clearArtDb={clearArtDb}
            numberArt={numberArt}
          />
        </Suspense>
      )}
      {!hasAudio && (
        <Suspense fallback={<UiLoading />}>
          <UiArtItemsList
            artItems={artItems}
            clearArtDb={clearArtDb}
            numberArt={numberArt}
          />
        </Suspense>
      )}
      {totalValidItems.length > numberArt && hasAudio === false && (
        <div className={classes.loadMoreArt}>
          <Button variant="contained" color="primary" size="large" onClick={toggleLoadMore}>
            Load more
          </Button>
        </div>
      )}
    </Box>
  );
};

Landing.propTypes = {
  handleGetRandomArtwork: PropTypes.func.isRequired,
  artItems: PropTypes.array.isRequired,
  artDB: PropTypes.func.isRequired,
};
