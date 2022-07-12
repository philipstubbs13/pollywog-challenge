import React from 'react';
import { Link } from 'react-router-dom';
import HelpOutlineOutlined from '@material-ui/icons/HelpOutlineOutlined';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined';
import {
  Box, Tooltip, AppBar, Toolbar, IconButton, Typography,
} from '@material-ui/core';
import { useUiNavBarStyles } from './UiNavBar.styles';

export const UiNavBar = () => {
  const classes = useUiNavBarStyles();

  return (
    <Box width="100%">
      <AppBar position="static" className="appBar">
        <Toolbar>
          <Link to="/" style={{ textDecoration: 'none', color: 'var(--app-light-color)' }}>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Explore Art
            </Typography>
          </Link>
          <Box flexGrow={1} />
          <div className={classes.sectionDesktop}>
            <Tooltip title="Favorites" placement="bottom">
              <IconButton component={Link} to="/favorites">
                <StarBorderOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title="About" placement="bottom">
              <IconButton component={Link} to="/about">
                <InfoOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title="Help" placement="bottom">
              <IconButton component={Link} to="/help">
                <HelpOutlineOutlined />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
