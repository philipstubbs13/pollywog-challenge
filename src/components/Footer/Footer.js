// global import of React so that we can use it.
import React from 'react';
// import PropTypes for documenting/checking component's property types.
import PropTypes from 'prop-types';
// import styling and components from material ui library.
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// CSS in JS
const styles = () => ({
  card: {
    width: '100%',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  footerContent: {
    margin: 10,
  },
});

// Functional based React component for Footer.
function Footer(props) {
  // ES6 destructuring.
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardContent className={classes.footerContent}>
        <Typography variant="h5" component="h2">
          Explore Art
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Phil Stubbs
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Copyright &copy; 2019
        </Typography>
      </CardContent>
    </Card>
  );
}

// Document/validate props that are passed to the component.
Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export the component from this file.
export default withStyles(styles)(Footer);
