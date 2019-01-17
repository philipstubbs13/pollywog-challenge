// Global import of React so that we can use it.
// and add Suspense to add loading component while waiting to
// render/retrieve artwork from API request.
import React, { Component, Suspense } from 'react';
// import PropTypes for defining/checking component props.
import PropTypes from 'prop-types';
// import styling and components from material-ui library
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import the Loading component
import Loading from '../../components/Loading';
// import the ArtItemsList component using lazy loading.
const ArtItemsList = React.lazy(() => import('../../components/ArtItemsList'));

// CSS in JS
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
});

// Class based React component for Landing page/container.
class Landing extends Component {
  // Initial state
  // numberArt is the number of artworks to display on the page.
  state = {
    numberArt: 10,
    hasAudioItems: [],
    hasAudio: false,
  }

  // Ths function handles clearing out the all the artwork currently stored
  // in indexed db when the user clicks the Explore More button.
  // It doesn't clear out the favorited artwork though.
  clearArtDb = () => {
    // ES6 destructuring
    const { artDB, handleGetRandomArtwork } = this.props;
    // Here, we are opening up the art_store db in indexeddb.
    artDB().then((db) => {
      // Then, starting a transaction to update the random_art object in the db.
      const txxx = db.transaction('random_art', 'readwrite');
      // We want to clear/remove the art stored in indexeddb.
      txxx.objectStore('random_art').clear();
      // After the transaction is complete,
      // Get new, random artwork from API and store in indexeddb.
      txxx.complete.then(() => {
        handleGetRandomArtwork();
      });
    });
  }

  // Ths function handles loading more artwork
  // when the user clicks load more at the bottom of the page.
  toggleLoadMore = () => {
    // ES6 destructuring
    const { numberArt } = this.state;
    // numberArt determines how many artworks to render on the Landing page.
    this.setState({ numberArt: numberArt + 4 });
  }

  // This function handles filtering the array of art items in the store to 
  // only include the artwork that has audio.
  filterAudio = () => {
    // ES6 destructuring.
    const { artItems } = this.props;
    // We want to take all the valid artworks in the store and perform a filter.
    const totalValidItems = artItems.filter(item => item._source.image === 'valid' && item._source.public_access === '1');
    const hasAudioItems = totalValidItems.filter(item => item._source.hasOwnProperty(['related:audio-stops']));
    this.setState({
      hasAudioItems,
      hasAudio: true,
    });
  }

  // This handles clearing the audio filter to display all artwork.
  clearAudioFilter = () => {
    this.setState({
      hasAudio: false,
    });
  }

  render() {
    // ES6 destructuring
    const {
      classes,
      artItems,
    } = this.props;
    const { numberArt, hasAudioItems, hasAudio } = this.state;
    // totalValidItems includes only the artworks in IndexedDB that have a valid image
    // and are publicly accessible.
    const totalValidItems = artItems.filter(item => item._source.image === 'valid' && item._source.public_access === '1');
    const hasAudioItemsCount = totalValidItems.filter(item => item._source.hasOwnProperty(['related:audio-stops']));
    return (
      <div>
        <Typography variant="h2" className={classes.landingTitle}>
          Explore Art
        </Typography>
        {/* If the ArtItemsList is not yet loaded by the time Landing page renders,
        show some fallback content while we’re waiting for it to load.
         This is done using the Suspense component */}
        {/* When user clicks the Explore more button on the Landing page. */}
        {/* Fetch 10 different random artworks from the API. */}
        {/* Then update/add to indexed db. */}
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
            <Suspense fallback={<Loading />}>
              <ArtItemsList
                artItems={hasAudioItems}
                clearArtDb={this.clearArtDb}
                numberArt={numberArt}
              />
            </Suspense>
          </React.Fragment>
        ) : (
          <Suspense fallback={<Loading />}>
            <ArtItemsList
              artItems={artItems}
              clearArtDb={this.clearArtDb}
              numberArt={numberArt}
            />
          </Suspense>
        )}
        {/* The Load more button at the bottom of the page gives the user */}
        {/* option to load more. */}
        {/* If the total number of valid artworks in IndexedDB is greater than
        the number of artworks currently displayed on the screen,
        then show the load more button. */}
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

// Document/check prop types
Landing.propTypes = {
  classes: PropTypes.object.isRequired,
  handleGetRandomArtwork: PropTypes.func.isRequired,
  artItems: PropTypes.array.isRequired,
  artDB: PropTypes.func.isRequired,
};

// export the component from this file.
export default withStyles(styles)(Landing);
