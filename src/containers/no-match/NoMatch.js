import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useNoMatchStyles } from './NoMatch.styles';

export const NoMatch = () => {
  const classes = useNoMatchStyles()

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
