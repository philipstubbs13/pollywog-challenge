import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useAboutStyles } from './About.styles';

export const About = () => {
  const classes = useAboutStyles();

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
