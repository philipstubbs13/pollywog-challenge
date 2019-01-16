// Global import of react so that we can use it.
import React from 'react';
// import PropTypes for documenting/checking the component's properties.
import PropTypes from 'prop-types';
// import third party linking library for linking/routing.
import { Link } from 'react-router-dom';
// import classnames package
import classNames from 'classnames';
// import styling and components from the material ui library.
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

// Define different icons for each type of message.
const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

// CSS in JS
const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const {
    classes,
    className,
    message,
    onClose,
    variant,
    ...other
  } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classes.snackbar}
      aria-describedby="client-snackbar"
      message={(
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      )}
      {...other}
    />
  );
}

// Document/check prop types.
MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

// Document/define default props for props that aren't required.
MySnackbarContent.defaultProps = {
  className: 'string',
};

// export component.
const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

// CSS in JS
const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

// Class based React component for displaying a message to the user within the app.
class AppMessage extends React.Component {
  render() {
    // ES6 destructuring.
    const {
      open,
      onClose,
      message,
      variant,
      link,
      action,
    } = this.props;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={onClose}
        >
          <MySnackbarContentWrapper
            onClose={onClose}
            variant={variant}
            message={message}
            action={[
              <Button
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={onClose}
                component={Link}
                to={link}
              >
                {action}
              </Button>,
            ]}
          />
        </Snackbar>
      </div>
    );
  }
}

// Document/check prop types.
AppMessage.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  link: PropTypes.string,
  action: PropTypes.string,
};

// Document/define default props for props that aren't required.
AppMessage.defaultProps = {
  link: '',
  action: '',
};

// export the component from this file.
export default withStyles(styles2)(AppMessage);
