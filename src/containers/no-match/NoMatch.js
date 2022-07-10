import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, Button } from '@material-ui/core';

export const NoMatch = () => {
  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
      <Typography variant="h4">
        Page not found
      </Typography>
      <Typography variant="h6">
        The page you are looking for might have been deleted, moved, or does not exist.
      </Typography>
      <Box marginY={2}>
        <Button color="primary" variant="contained" size="large" component={Link} to="/">
          Back to home
        </Button>
      </Box>
      <img width={'300px'} height={'300px'} src="https://1.api.artsmia.org/15790.jpg" alt="Art not available" />
    </Box>
  );
}
