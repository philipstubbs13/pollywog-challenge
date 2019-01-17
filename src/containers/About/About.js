// Global import of React so that we can use it.
import React from 'react';
// import PropTypes for defining/checking component props.
import PropTypes from 'prop-types';
// import styling and components from material ui libary.
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// CSS in JS
const styles = theme => ({
  aboutContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  aboutItem: {
    marginTop: 10,
    width: '50%',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      width: '70%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center',
  },
  aboutText: {
    marginTop: 25,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  aboutTitle: {
    marginTop: 25,
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },
});

// Functional React based component for the About page.
function About(props) {
  // ES6 destructuring.
  const { classes } = props;
  return (
    <Grid container direction="column" justify="center" spacing={16} className={classes.aboutContainer}>
      <Grid item xs={12} className={classes.aboutItem}>
        <Paper className={classes.root} elevation={5}>
          <Typography variant="h4" className={classes.aboutTitle}>
            About Explore Art
          </Typography>
          <Typography variant="h6" className={classes.aboutText}>
            Use the Explore Art app to search, discover, and favorite pieces of art
            you didn&#39;t even know existed.
          </Typography>
          <Typography variant="h6" className={classes.aboutText}>
            All art is from the Minneapolis Institute of Art&#39;s collection.
            For more information about the Minneapolis Institute of Art, go to their <a href="https://new.artsmia.org/" target="_blank" rel="noopener noreferrer">website</a>.
          </Typography>
          <Typography variant="h6" className={classes.aboutText}>
            The code for this app is available on <a href="https://github.com/philipstubbs13/pollywog-challenge/tree/phil_react_code" target="_blank" rel="noopener noreferrer">GitHub</a>.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

// Document / validate component's prop types.
About.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export the component from this file.
export default withStyles(styles)(About);
