import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { UiLoading } from '../../components/ui-loading/UiLoading';
import { UiArtItemsList } from '../../components/ui-art-items-list/UiArtItemsList'

const styles = theme => ({
  landingTitle: {
    fontWeight: 'bold',
    marginLeft: 6,
    color: theme.palette.common.black,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  exploreMoreBtn: {
    marginTop: 15,
  },
  loadMoreArt: {
    marginTop: 30,
    display: 'flex',
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  hasAudioBtn: {
    marginLeft: 15,
    marginTop: 15,
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 6,
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  landingContainer: {
    marginBottom: 150,
  },
});

class Landing extends Component {
  state = {
    numberArt: 10,
    hasAudioItems: [],
    hasAudio: false,
  }

  clearArtDb = () => {
    // ES6 destructuring
    const { artDB, handleGetRandomArtwork } = this.props;
    artDB().then((db) => {
      const txxx = db.transaction('random_art', 'readwrite');
      txxx.objectStore('random_art').clear();
      txxx.complete.then(() => {
        handleGetRandomArtwork();
      });
    });
  }

  toggleLoadMore = () => {
    const { numberArt } = this.state;
    this.setState({ numberArt: numberArt + 4 });
  }

  filterAudio = () => {
    const { artItems } = this.props;
    const totalValidItems = artItems.filter(item => item._source.image === 'valid' && item._source.public_access === '1');
    const hasAudioItems = totalValidItems.filter(item => item._source.hasOwnProperty(['related:audio-stops']));
    this.setState({
      hasAudioItems,
      hasAudio: true,
    });
  }

  clearAudioFilter = () => {
    this.setState({
      hasAudio: false,
    });
  }

  render() {
    const {
      classes,
      artItems,
    } = this.props;
    const { numberArt, hasAudioItems, hasAudio } = this.state;
    const totalValidItems = artItems.filter(item => item._source.image === 'valid' && item._source.public_access === '1');
    const hasAudioItemsCount = totalValidItems.filter(item => item._source.hasOwnProperty(['related:audio-stops']));
    return (
      <div className={classes.landingContainer}>
        <Typography variant="h2" className={classes.landingTitle}>
          Explore Art
        </Typography>
        <div className={classes.buttons}>
          <Button variant="contained" className={classes.exploreMoreBtn} color="primary" size="large" onClick={() => this.clearArtDb()}>
            Explore more
          </Button>
          {hasAudioItemsCount.length > 0 && hasAudio === false && (
            <Button variant="contained" className={classes.hasAudioBtn} color="primary" size="large" onClick={() => this.filterAudio()}>
              Has Audio
            </Button>
          )}
          {hasAudio && (
            <Button variant="contained" className={classes.hasAudioBtn} color="primary" size="large" onClick={() => this.clearAudioFilter()}>
              Clear audio filter
            </Button>
          )}
        </div>
        {hasAudio ? (
          <React.Fragment>
            <Suspense fallback={<UiLoading />}>
              <UiArtItemsList
                artItems={hasAudioItems}
                clearArtDb={this.clearArtDb}
                numberArt={numberArt}
              />
            </Suspense>
          </React.Fragment>
        ) : (
          <Suspense fallback={<UiLoading />}>
            <UiArtItemsList
              artItems={artItems}
              clearArtDb={this.clearArtDb}
              numberArt={numberArt}
            />
          </Suspense>
        )}
        {totalValidItems.length > numberArt && hasAudio === false && (
          <div className={classes.loadMoreArt}>
            <Button variant="contained" color="primary" size="large" onClick={() => this.toggleLoadMore()}>
              Load more
            </Button>
          </div>
        )}
      </div>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
  handleGetRandomArtwork: PropTypes.func.isRequired,
  artItems: PropTypes.array.isRequired,
  artDB: PropTypes.func.isRequired,
};

export default withStyles(styles)(Landing);
