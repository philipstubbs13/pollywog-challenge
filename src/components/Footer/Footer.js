import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  card: {
    width: '100%',
    marginTop: 50,
    height: '10rem',
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

function Footer(props) {
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

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
