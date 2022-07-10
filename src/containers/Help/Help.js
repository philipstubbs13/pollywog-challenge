import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import topics from './topics.json';
import { useHelpStyles } from './Help.styles';
import { Typography, Grid, Accordion, AccordionSummary, AccordionDetails, Box } from '@material-ui/core';

export const Help = () => {
  const classes = useHelpStyles()

  return (
    <Grid container direction="column" alignItems={'center'} justifyContent="center" spacing={4} className={classes.helpContainer}>
      <Grid item xs={12} className={classes.helpItem}>
        <Typography variant="h4" className={classes.helpTitle}>
          Help
        </Typography>
        <Box width={'100%'}>
          {topics.map(topic => (
            <Accordion className={classes.topic} key={topic.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  {topic.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle1">
                  {topic.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}
