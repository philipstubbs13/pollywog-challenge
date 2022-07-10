import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import topics from './topics.json';
import { useHelpStyles } from './Help.styles';

export const Help = () => {
  const classes = useHelpStyles()

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
