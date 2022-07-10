import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { UiLoading } from '../ui-loading/UiLoading';
import './ArtItemsList.css';
import { useUiArtItemsListStyles } from './UiArtItemsList.styles';

export const UiArtItemsList = (props) => {
  const classes = useUiArtItemsListStyles();

  const addDefaultSrc = (event) => {
    event.target.src = 'https://1.api.artsmia.org/15790.jpg';
  };

  return (
    <div>
      <Grid container direction="row" justify="flex-start" className={classes.artContainer} alignItems="center" spacing={24}>
        {props.isLoading ? (
          <UiLoading />
        ) : (
          <>
            {props.artItems.filter((item) => item._source.image === 'valid' && item._source.public_access === '1').splice(0, props.numberArt).map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._source.id} className={classes.artItem}>
                <Link to={{ pathname: `/artwork/${item._source.id}`, state: { artItems: props.artItems } }}>
                  <div className="image">
                    <img onError={addDefaultSrc} src={`https://1.api.artsmia.org/${item._source.id}.jpg`} alt={item._source.title} className="artImage" />
                    <div className="art-title">
                      <Typography variant="h6" className={classes.artTitle}>{item._source.title}</Typography>
                      {item._source.hasOwnProperty(['related:audio-stops']) && (
                        <Typography variant="h6"><i className="fas fa-volume-up" /> Contains audio</Typography>
                      )}
                    </div>
                  </div>
                </Link>
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </div>
  );
};

UiArtItemsList.propTypes = {
  artItems: PropTypes.array.isRequired,
  numberArt: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
};
UiArtItemsList.defaultProps = {
  isLoading: false,
};
