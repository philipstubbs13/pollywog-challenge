// Global import of React
import React from 'react';
// import PropTypes for defining/checking component props.
import PropTypes from 'prop-types';
// import third party linking library
import { Link } from 'react-router-dom';
// import styling and components from material-ui library.
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import HelpOutlineOutlined from '@material-ui/icons/HelpOutlineOutlined';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined';

// CSS in JS
const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
});

// Class based React component for the top navigation bar.
class NavBar extends React.Component {
  render() {
    // ES6 destructuring.
    const { classes } = this.props;

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
}

// Document/check component prop types.
NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export the NavBar component
export default withStyles(styles)(NavBar);
