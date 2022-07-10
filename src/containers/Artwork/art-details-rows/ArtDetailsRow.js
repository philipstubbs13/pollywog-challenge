import PropTypes from 'prop-types';
import { useArtDetailsRowStyles} from './ArtDetailsRow.styles';
import { Box, Typography } from '@material-ui/core';

export const ArtDetailsRow = (props) => {
  const classes = useArtDetailsRowStyles();

  return (
    <Box display={'flex'} marginTop={'10px'}>
        <Typography variant="body1" className={classes.term}>
        {props.term}
        </Typography>
        <Typography variant="body1" className={classes.definition}>
        {props.definition}
        </Typography>
    </Box>
  );

}

ArtDetailsRow.propTypes = {
  term: PropTypes.string.isRequired,
  definition: PropTypes.string.isRequired
};
