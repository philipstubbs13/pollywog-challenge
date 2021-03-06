// Global import of React.
import React, { Component } from 'react';
// import PropTypes for defining/checking component props.
import PropTypes from 'prop-types';
// import react-sound package to add sound for artwork that have audio avaiable.
import Sound from 'react-sound';
// import styling and components from material-ui library
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined';
// import AppMessage component
import AppMessage from '../../components/AppMessage';
// import external css file for this component.
import './Artwork.css';

// CSS in JS
const styles = theme => ({
  artworkContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginBottom: 200,
  },
  artItem: {
    marginTop: 20,
    flex: 1,
  },
  artImage: {
    border: '1px solid var(--app-dark-color)',
    marginTop: 20,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  artInfo: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginTop: 20,
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
    border: '1px solid var(--app-light-color)',
  },
  artDetailsContainer: {
    marginTop: 30,
  },
  artDescription: {
    marginTop: 30,
  },
  exhibitionContainer: {
    marginTop: 30,
  },
  artDetailsRow: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  itemTitle: {
    display: 'flex',
    flexDirection: 'column',
    width: '40%',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      width: '100%',
    },
  },
  itemSubtitle: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      width: '100%',
    },
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
  },
  backBtn: {
    marginBottom: 20,
  },
  favoriteBtn: {
    marginBottom: 20,
    marginLeft: 'auto',
  },
  art: {
    display: 'flex',
    flexDirection: 'column',
  },
  playAudioBtn: {
    marginTop: 20,
  },
  exhibitListItem: {
    marginTop: 20,
  },
  audioSubtext: {
    marginTop: 5,
  },
});

// Class based React component for the Artwork Details page/container
class Artwork extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  // Initial state.
  // Play is false so if there's audio it doesn't play automatically.
  // open is used to open the snackbar message when user saves art to favorites.
  // findSavedItem is an array that will be empty if the particular artwork
  // is not saved to user's favorites.
  state = {
    play: false,
    open: false,
    findSavedItem: [],
  }

  // When the component mounts to the page.
  componentDidMount() {
    // Grab the id of the specific artwork from props/url
    const { match } = this.props;
    const { id } = match.params;
    // Open the artFavoritesDB in IndexedDB.
    const { artFavoritesDB } = this.props;
    artFavoritesDB().then(db => db.transaction('favorite_art')
      // get favorited art from the IndexedDB store.
      .objectStore('favorite_art').getAll()).then((obj) => {
      // If the favorite art is available in the store,
      // Grab the art and add to App component state.
      if (obj.length) {
        // This allows us to determine if the artwork currently showing on the details page
        // is already in the user's favorites or not.
        // If the artwork is already in user's favorites, we won't show the star icon.
        const findSavedItem = obj.filter(item => item._source.id === id);
        this.setState({
          findSavedItem,
        });
      }
    });
  }

  // This function handles saving the artwork displayed on the page
  // to the user's favorites in IndexedDB.
  handleSaveToFavorites = () => {
    // ES6 destructuring of props.
    const { artFavoritesDB } = this.props;
    // Grab the list of artItems from component state.
    const { artItems } = this.props;
    // Grab the id of the specific artwork from props/url
    const { match } = this.props;
    const { id } = match.params;
    // Filter out the artworks in the array to find the specific artwork user wants to save.
    const artwork = artItems.filter(item => item._source.id === id);
    // Open the artDB in IndexedDB.
    artFavoritesDB().then(db => db.transaction('favorite_art', 'readwrite')
      // get art info from the IndexedDB store.
      .objectStore('favorite_art').put({
        _source: artwork[0]._source,
        _id: artwork[0]._id,
      })
      .then(() => {
        // Show success message.
        this.setState({ open: true });
      }));
  }

  // This function handles playing and pausing the audio for an artwork.
  togglePlayAudio = () => {
    // ES6 destructuring.
    const { play } = this.state;
    this.setState({ play: !play });
  };

  // This takes care of closing the snackbar message component.
  // that appears when the user successfully saves an artwork to their favorites.
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      open: false,
    });
  };

  // This allows the user to go back from the art details page to either
  // the landing page or to the favorites page, depending on what
  // page they started at.
  goBack() {
    const { history } = this.props;
    history.goBack();
  }

  // If an artwork does not have an image available,
  // use the default/placeholder image instead.
  // This solves the issue of broken image links.
  addDefaultSrc(ev) {
    ev.target.src = 'https://1.api.artsmia.org/15790.jpg';
  }

  render() {
    // ES6 destructuring
    const { classes, location } = this.props;
    const { play, open, findSavedItem } = this.state;
    const { state } = location;
    const { artItems } = state;
    // Grab the id of the specific artwork from props/url
    const { match } = this.props;
    const { id } = match.params;

    return (
      <React.Fragment>
        {/* Here, we are filtering the artItems array */}
        {/* To find a particular artwork by the id passed as a param in the url. */}
        {artItems.filter(item => item._source.id === id).map(item => (
          <div className={classes.artworkContainer} key={item._source.id}>
            <div className={classes.art}>
              <img
                src={`https://1.api.artsmia.org/${id}.jpg`}
                alt={item._source.title}
                className={classes.artImage}
                onError={this.addDefaultSrc}
              />
              <React.Fragment>
                {/* If an artwork has a related audio, render a play/pause button. */}
                {item._source.hasOwnProperty(['related:audio-stops']) && (
                  <React.Fragment>
                    {play ? (
                      <React.Fragment>
                        <Button variant="contained" size="large" className={classes.playAudioBtn} color="primary" onClick={() => this.togglePlayAudio()}>
                          <i classN="fas fa-pause" /> Stop audio tour
                        </Button>
                        <Sound
                          url={item._source['related:audio-stops'][0].link}
                          playStatus={Sound.status.PLAYING}
                          playFromPosition={300 /* in milliseconds */}
                          onLoading={this.handleSongLoading}
                          onPlaying={this.handleSongPlaying}
                          onFinishedPlaying={this.handleSongFinishedPlaying}
                        />
                      </React.Fragment>
                    ) : (
                      <Button variant="contained" size="large" className={classes.playAudioBtn} color="primary" onClick={() => this.togglePlayAudio()}>
                        <i className="fas fa-play" /> Play audio tour
                      </Button>
                    )}
                    <small
                      className={classes.audioSubtext}
                    >
                      *Don&#39;t hear anything? Check the volume level on your device.
                    </small>
                  </React.Fragment>
                )}
              </React.Fragment>
            </div>
            <div className={classes.artInfo}>
              <Paper className={classes.root} elevation={5}>
                <div className={classes.buttons}>
                  <Button variant="outlined" className={classes.backBtn} color="secondary" onClick={this.goBack}>
                    <i className="fas fa-chevron-left" />{' '} back
                  </Button>
                  {/* Here, if the artwork that is currently showing on the details page isn't
                  currently in the user's favorites, we will show the star icon.
                  Else, if the artwork is already favorited, we won't show the star icon
                  so that the user can't save the artwork twice. */}
                  {findSavedItem.length === 0 && (
                    <React.Fragment>
                      <Tooltip title="Add to favorites" placement="bottom">
                        <IconButton
                          className={classes.favoriteBtn}
                          onClick={() => this.handleSaveToFavorites()}
                        >
                          <StarBorderOutlined />
                        </IconButton>
                      </Tooltip>
                      <AppMessage open={open} onClose={() => this.handleClose()} message={`The following art was successfully saved to favorites: ${item._source.title}`} variant="success" link="#" />
                    </React.Fragment>
                  )}
                </div>
                {/* The following information is all information we
                got from the ElasticSearch API and saved to the IndexedDB store. */}
                <div className={classes.artTitle}>
                  <Typography variant="h5" component="h3">
                    {item._source.title}
                  </Typography>
                  <Typography variant="body1" component="h4">
                    {item._source.artist === '' ? null : item._source.artist}
                  </Typography>
                </div>
                <div className={classes.artDescription}>
                  <Typography variant="body1">
                    {item._source.description}
                  </Typography>
                </div>
                <div className={classes.artDetailsContainer}>
                  <Typography variant="h5">
                    Details
                  </Typography>
                  <Divider />
                  <div className={classes.artDetailsRow}>
                    <Typography variant="body1" className={classes.itemTitle}>
                      Title
                    </Typography>
                    <Typography variant="body1" className={classes.itemSubtitle}>
                      {item._source.title}
                    </Typography>
                  </div>
                  <div className={classes.artDetailsRow}>
                    <Typography variant="body1" className={classes.itemTitle}>
                      Dated
                    </Typography>
                    <Typography variant="body1" className={classes.itemSubtitle}>
                      {item._source.dated}
                    </Typography>
                  </div>
                  <div className={classes.artDetailsRow}>
                    <Typography variant="body1" className={classes.itemTitle}>
                      Artist
                    </Typography>
                    <Typography variant="body1" className={classes.itemSubtitle}>
                      {item._source.artist === '' ? 'Not specified' : item._source.artist}
                    </Typography>
                  </div>
                  <div className={classes.artDetailsRow}>
                    <Typography variant="body1" className={classes.itemTitle}>
                      Nationality
                    </Typography>
                    <Typography variant="body1" className={classes.itemSubtitle}>
                      {item._source.nationality === null || item._source.nationality === '' ? 'Not specified' : item._source.nationality}
                    </Typography>
                  </div>
                  <div className={classes.artDetailsRow}>
                    <Typography variant="body1" className={classes.itemTitle}>
                     Artist life
                    </Typography>
                    <Typography variant="body1" className={classes.itemSubtitle}>
                      {item._source.life_date === null ? 'Not specified' : item._source.life_date}
                    </Typography>
                  </div>
                  <div className={classes.artDetailsRow}>
                    <Typography variant="body1" className={classes.itemTitle}>
                     Role
                    </Typography>
                    <Typography variant="body1" className={classes.itemSubtitle}>
                      {item._source.role}
                    </Typography>
                  </div>
                  <div className={classes.artDetailsRow}>
                    <Typography variant="body1" className={classes.itemTitle}>
                     Department
                    </Typography>
                    <Typography variant="body1" className={classes.itemSubtitle}>
                      {item._source.department}
                    </Typography>
                  </div>
                  <div className={classes.artDetailsRow}>
                    <Typography variant="body1" className={classes.itemTitle}>
                     Dimension
                    </Typography>
                    <Typography variant="body1" className={classes.itemSubtitle}>
                      {item._source.dimension === '' || item._source.dimension == null ? 'Not specified' : item._source.dimension}
                    </Typography>
                  </div>
                  <div className={classes.artDetailsRow}>
                    <Typography variant="body1" className={classes.itemTitle}>
                     Credit
                    </Typography>
                    <Typography variant="body1" className={classes.itemSubtitle}>
                      {item._source.creditline}
                    </Typography>
                  </div>
                  <div className={classes.artDetailsRow}>
                    <Typography variant="body1" className={classes.itemTitle}>
                      Accession number
                    </Typography>
                    <Typography variant="body1" className={classes.itemSubtitle}>
                      {item._source.accession_number}
                    </Typography>
                  </div>
                  <div className={classes.artDetailsRow}>
                    <Typography variant="body1" className={classes.itemTitle}>
                     Medium
                    </Typography>
                    <Typography variant="body1" className={classes.itemSubtitle}>
                      {item._source.medium}
                    </Typography>
                  </div>
                  <div className={classes.artDetailsRow}>
                    <Typography variant="body1" className={classes.itemTitle}>
                      Country
                    </Typography>
                    <Typography variant="body1" className={classes.itemSubtitle}>
                      {item._source.country}
                    </Typography>
                  </div>
                  <div className={classes.artDetailsRow}>
                    <Typography variant="body1" className={classes.itemTitle}>
                     Century
                    </Typography>
                    <Typography variant="body1" className={classes.itemSubtitle}>
                      {item._source.style == null ? 'Not specified' : item._source.style}
                    </Typography>
                  </div>
                  <div className={classes.artDetailsRow}>
                    <Typography variant="body1" className={classes.itemTitle}>
                     Rights
                    </Typography>
                    <Typography variant="body1" className={classes.itemSubtitle}>
                      {item._source.rights_type}
                    </Typography>
                  </div>
                  <div className={classes.artDetailsRow}>
                    <Typography variant="body1" className={classes.itemTitle}>
                     Classification
                    </Typography>
                    <Typography variant="body1" className={classes.itemSubtitle}>
                      {item._source.classification}
                    </Typography>
                  </div>
                  <div className={classes.artDetailsRow}>
                    <Typography variant="body1" className={classes.itemTitle}>
                     Object name
                    </Typography>
                    <Typography variant="body1" className={classes.itemSubtitle}>
                      {item._source.object_name === '' || item._source.object_name == null ? 'Not specified' : item._source.object_name}
                    </Typography>
                  </div>
                </div>
                {/* If an artwork has related exhibitions, list those at the end. */}
                {item._source.hasOwnProperty(['related:exhibitions']) && (
                  <React.Fragment>
                    {item._source['related:exhibitions'].length > 0 && (
                      <div className={classes.exhibitionContainer}>
                        <Typography variant="h5">
                          Exhibitions
                        </Typography>
                        <Divider />
                        <List>
                          {item._source['related:exhibitions'].map(exhibit => (
                            <div className={classes.exhibitListItem} key={exhibit.id}>
                              <Typography variant="h6">{exhibit.title}</Typography>
                              <Typography variant="subtitle1">{exhibit.date}</Typography>
                              <Typography variant="body1">{exhibit.description}</Typography>
                            </div>
                          ))}
                        </List>
                      </div>
                    )}
                  </React.Fragment>
                )}
              </Paper>
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

// Document/check prop types
Artwork.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  artFavoritesDB: PropTypes.func.isRequired,
  artItems: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

// export the component from this file.
export default withStyles(styles)(Artwork);
