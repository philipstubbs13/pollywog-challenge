// Global import of React.
import React, { Component } from 'react';
// import third party linking library.
import { Link } from 'react-router-dom';
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
// import AppMessage component
import AppMessage from '../../components/AppMessage';
// import external css fille
import './Artwork.css';

// CSS in JS
const styles = theme => ({
  artworkContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  artItem: {
    marginTop: 20,
    flex: 1,
  },
  artImage: {
    border: '1px solid var(--app-dark-color)',
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
    width: '50%',
    border: '1px solid var(--app-dark-color)',
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
  },
  itemSubtitle: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
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

  state = {
    play: false,
    open: false,
  }

  handleSaveToFavorites = () => {
    const { artFavoritesDB } = this.props;
    // Grab the list of artItems from component state.
    const { artItems } = this.props;
    // Grab the id of the specific artwork from props/url
    const { match } = this.props;
    const { id } = match.params;
    const artwork = artItems.filter(item => item._source.id === id);
    // Open the artDB in IndexedDB.
    artFavoritesDB().then(db => db.transaction('favorite_art', 'readwrite')
      // get user info from the IndexedDB store.
      .objectStore('favorite_art').put({
        _source: artwork[0]._source,
        _id: artwork[0]._id,
      })
      .then(() => {
        this.setState({ open: true });
      }));
  }

  // This function handles playing and pausing the audio for an artwork.
  togglePlayAudio = () => {
    // ES6 destructuring.
    const { play } = this.state;
    this.setState({ play: !play });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      open: false,
    });
  };

  goBack() {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    // ES6 destructuring
    const { classes, location } = this.props;
    const { play, open } = this.state;
    const { state } = location;
    const { artItems } = state;
    // Grab the id of the specific artwork from props/url
    const { match } = this.props;
    const { id } = match.params;
    const { path } = match;
    console.log(this.props.from);

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
              />
              <React.Fragment>
                {/* If an artwork has a related audio, render a play/pause button. */}
                {item._source.hasOwnProperty(['related:audio-stops']) && (
                  <React.Fragment>
                    {play ? (
                      <React.Fragment>
                        <Button variant="contained" size="large" className={classes.playAudioBtn} color="primary" onClick={() => this.togglePlayAudio()}>
                          <i classN="fas fa-pause" /> Pause audio tour
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
                  <Button variant="contained" className={classes.backBtn} color="primary" onClick={this.goBack}>
                    <i className="fas fa-chevron-left" />{' '} back
                  </Button>
                  { path === '/artwork/:id' && (
                    <React.Fragment>
                      <Tooltip title="Add to favorites" placement="bottom">
                        <IconButton color="inherit" className={classes.favoriteBtn} onClick={() => this.handleSaveToFavorites()}>
                          <i className="far fa-star" />
                        </IconButton>
                      </Tooltip>
                      <AppMessage open={open} onClose={() => this.handleClose()} message={`The following art was successfully saved to favorites: ${item._source.title}`} variant="success" link="#" />
                    </React.Fragment>
                  )}
                </div>
                <div className={classes.artTitle}>
                  <Typography variant="h5" component="h3">
                    {item._source.title}
                  </Typography>
                  <Typography variant="body1" component="h4">
                    {item._source.artist === '' ? null : item._source.artist}
                  </Typography>
                </div>
                <div className={classes.artDescription}>
                  {item._source.description}
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
                            <React.Fragment>
                              <div className={classes.exhibitListItem}>
                                <Typography variant="title">{exhibit.title}</Typography>
                                <Typography variant="subtitle1">{exhibit.date}</Typography>
                                <Typography variant="body1">{exhibit.description}</Typography>
                              </div>
                            </React.Fragment>
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
};

// export the component from this file.
export default withStyles(styles)(Artwork);
