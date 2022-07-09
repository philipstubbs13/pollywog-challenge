import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  noMatchContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noMatchBtn: {
    marginTop: 20,
  },
  noMatchText: {
    color: theme.palette.common.black,
  },
  noMatchImage: {
    width: '300px',
    height: '300px',
  },
});

function NoMatch(props) {
  const { classes } = props;

  return (
    <div className={classes.noMatchContainer}>
      <Typography variant="h4" className={classes.noMatchText}>
        Page not found
      </Typography>
      <Typography variant="h6" className={classes.noMatchText}>
        The page you are looking for might have been deleted, moved, or does not exist.
      </Typography>
      <Button color="primary" className={classes.noMatchBtn} variant="contained" size="large" component={Link} to="/">
        Back to home
      </Button>
      <img src="https://1.api.artsmia.org/15790.jpg" alt="Art not available" className={classes.noMatchImage} />
    </div>
  );
}

NoMatch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoMatch);
