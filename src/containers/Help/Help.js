// Global import of React so that we can use it.
import React from 'react';
// import PropTypes for defining/checking component props.
import PropTypes from 'prop-types';
// import styling and components from material ui libary.
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import help json file
import topics from './topics.json';

// CSS in JS
const styles = theme => ({
  helpContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  helpItem: {
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
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(15),
    },
  },
  helpText: {
    marginTop: 25,
  },
  helpTitle: {
    color: theme.palette.common.black,
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },
  topic: {
    marginTop: 20,
  },
});

// Functional React based component for the Help page.
function Help(props) {
  // ES6 destructuring.
  const { classes } = props;
  return (
    <Grid container direction="column" justify="center" spacing={16} className={classes.helpContainer}>
      <Grid item xs={12} className={classes.helpItem}>
        <Typography variant="h4" className={classes.helpTitle}>
          Help
        </Typography>
        <div className={classes.root}>
          {topics.map(topic => (
            <ExpansionPanel className={classes.topic} key={topic.id}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  {topic.title}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography variant="subtitle1">
                  {topic.content}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </div>
      </Grid>
    </Grid>
  );
}

// Document / validate component's prop types.
Help.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export the component from this file.
export default withStyles(styles)(Help);
