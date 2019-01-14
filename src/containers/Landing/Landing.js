// Global Import of React
import React, { Component } from 'react';
// import styling and components from material-ui library
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// CSS in JS
const styles = () => ({
  artContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  artItem: {
    marginTop: 20,
  },
  artImage: {
    border: '1px solid var(--app-dark-color)',
  },
});

class Landing extends Component {
  render() {
    // ES6 destructuring
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="title">
          MyArtSearch
        </Typography>
        <div className={classes.artContainer}>
          <div className={classes.artItem}>
            <img src="http://lorempixel.com/250/250/nature/7" alt="artwork" className={classes.artImage} />
          </div>
          <div className={classes.artItem}>
            <img src="http://lorempixel.com/250/250/nature/1" alt="artwork" className={classes.artImage} />
          </div>
          <div className={classes.artItem}>
            <img src="http://lorempixel.com/250/250/nature/2" alt="artwork" className={classes.artImage} />
          </div>
          <div className={classes.artItem}>
            <img src="http://lorempixel.com/250/250/nature/3" alt="artwork" className={classes.artImage} />
          </div>
          <div className={classes.artItem}>
            <img src="http://lorempixel.com/250/250/nature/4" alt="artwork" className={classes.artImage} />
          </div>
          <div className={classes.artItem}>
            <img src="http://lorempixel.com/250/250/nature/5" alt="artwork" className={classes.artImage} />
          </div>
          <div className={classes.artItem}>
            <img src="http://lorempixel.com/250/250/nature/6" alt="artwork" className={classes.artImage} />
          </div>
          <div className={classes.artItem}>
            <img src="http://lorempixel.com/250/250/nature/8" alt="artwork" className={classes.artImage} />
          </div>
          <div className={classes.artItem}>
            <img src="http://lorempixel.com/250/250/nature/9" alt="artwork" className={classes.artImage} />
          </div>
          <div className={classes.artItem}>
            <img src="http://lorempixel.com/250/250/nature/10" alt="artwork" className={classes.artImage} />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Landing);
