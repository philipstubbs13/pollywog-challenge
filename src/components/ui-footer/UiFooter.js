import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useUiFooterStyles } from './UiFooter.styles';

export const UiFooter = () => {
  const classes = useUiFooterStyles();

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
          Copyright &copy; {new Date().getFullYear()}
        </Typography>
      </CardContent>
    </Card>
  );
};
