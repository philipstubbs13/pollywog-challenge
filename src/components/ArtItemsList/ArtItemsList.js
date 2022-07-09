import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Loading from '../Loading';
import './ArtItemsList.css';

const styles = theme => ({
  artItem: {
    marginTop: 20,
    flex: 1,
    marginLeft: 6,
    marginRight: 6,
  },
  artTitle: {
    color: theme.palette.common.black,
    fontWeight: 'bold',
  },
  artContainer: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
});

class ArtItemsList extends Component {
  addDefaultSrc(ev) {
    ev.target.src = 'https://1.api.artsmia.org/15790.jpg';
  }

  render() {
    const {
      classes,
      artItems,
      numberArt,
      isLoading,
    } = this.props;
    return (
      <div>
        <Grid container direction="row" justify="flex-start" className={classes.artContainer} alignItems="center" spacing={24}>
          {isLoading ? (
            <Loading />
          ) : (
            <React.Fragment>
              {artItems.filter(item => item._source.image === 'valid' && item._source.public_access === '1').splice(0, numberArt).map(item => (
                <Grid item xs={12} sm={6} md={4} key={item._source.id} className={classes.artItem}>
                  <Link to={{ pathname: `/artwork/${item._source.id}`, state: { artItems } }}>
                    <div className="image">
                      <img onError={this.addDefaultSrc} src={`https://1.api.artsmia.org/${item._source.id}.jpg`} alt={item._source.title} className="artImage" />
                      <div className="art-title">
                        <Typography variant="h6" className={classes.artTitle}>{item._source.title}</Typography>
                        {item._source.hasOwnProperty(['related:audio-stops']) && (
                          <Typography variant="h6"><i className="fas fa-volume-up" /> Contains audio</Typography>
                        )}
                      </div>
                    </div>
                  </Link>
                </Grid>
              ))}
            </React.Fragment>
          )}
        </Grid>
      </div>
    );
  }
}

ArtItemsList.propTypes = {
  classes: PropTypes.object.isRequired,
  artItems: PropTypes.array.isRequired,
  numberArt: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
};
ArtItemsList.defaultProps = {
  isLoading: false,
};

export default withStyles(styles)(ArtItemsList);
