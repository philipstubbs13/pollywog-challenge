import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { useArtDetailsRowStyles} from './ArtDetailsRow.styles';

export const ArtDetailsRow = (props) => {
  const classes = useArtDetailsRowStyles();

  return (
    <div className={classes.artDetailsRow}>
        <Typography variant="body1" className={classes.term}>
        {props.term}
        </Typography>
        <Typography variant="body1" className={classes.definition}>
        {props.definition}
        </Typography>
    </div>
  );

}

ArtDetailsRow.propTypes = {
  term: PropTypes.string.isRequired,
  definition: PropTypes.string.isRequired
};
