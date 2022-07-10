import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import HelpOutlineOutlined from '@material-ui/icons/HelpOutlineOutlined';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined';
import { useUiNavBarStyles } from './UiNavBar.styles';


export const UiNavBar = () => {
  const classes = useUiNavBarStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className="appBar">
        <Toolbar>
          <Link to="/" style={{ textDecoration: 'none', color: 'var(--app-light-color)' }}>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Explore Art
            </Typography>
          </Link>
          <div className={classes.grow} />
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
    </div>
  );
}