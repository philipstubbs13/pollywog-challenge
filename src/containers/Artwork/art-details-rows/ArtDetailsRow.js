import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { useArtDetailsRowStyles } from './ArtDetailsRow.styles';

export const ArtDetailsRow = (props) => {
  const classes = useArtDetailsRowStyles();
  const { term, definition } = props;
  const definitionDisplay = definition == null ? 'Not Specified' : definition;

  return (
    <Box display="flex" marginTop="10px">
      <Typography variant="body1" className={classes.term}>
        {term}
      </Typography>
      <Typography variant="body1" className={classes.definition}>
        {definitionDisplay}
      </Typography>
    </Box>
  );
};

ArtDetailsRow.propTypes = {
  term: PropTypes.string.isRequired,
  definition: PropTypes.string,
};
ArtDetailsRow.defaultProps = {
  definition: '',
};
