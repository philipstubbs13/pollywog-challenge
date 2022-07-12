import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined';
import AppMessage from '../../components/AppMessage';
import './Artwork.css';
import { useArtworkStyles } from './Artwork.styles';
import { ArtDetailsRow } from './art-details-rows/ArtDetailsRow';

export const Artwork = (props) => {
  const classes = useArtworkStyles();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [savedItem, setSavedItem] = useState([]);
  const {
    artFavoritesDB, match, artItems, history,
  } = props;
  const { params } = match;
  const { id } = params;

  useEffect(() => {
    artFavoritesDB().then((db) => db.transaction('favorite_art')
      .objectStore('favorite_art').getAll()).then((obj) => {
      if (obj.length) {
        const savedArtItem = obj.filter((item) => item._source.id === id);
        setSavedItem(savedArtItem);
      }
    });
  }, []);

  const onSaveToFavorites = () => {
    const artwork = artItems.filter((item) => item._source.id === id);
    artFavoritesDB().then((db) => db.transaction('favorite_art', 'readwrite')
      .objectStore('favorite_art').put({
        _source: artwork[0]._source,
        _id: artwork[0]._id,
      })
      .then(() => {
        setIsOpen(true);
      }));
  };

  const togglePlayAudio = () => {
    setIsPlaying(!isPlaying);
  };

  const onClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpen(false);
  };

  const goBack = () => {
    history.goBack();
  };

  const addDefaultSrc = (event) => {
    event.target.src = 'https://1.api.artsmia.org/15790.jpg';
  };

  return (
    <>
      {artItems.filter((item) => item._source.id === id).map((item) => (
        <div className={classes.artworkContainer} key={item._source.id}>
          <div className={classes.art}>
            <img
              src={`https://1.api.artsmia.org/${id}.jpg`}
              alt={item._source.title}
              className={classes.artImage}
              onError={addDefaultSrc}
            />
            {item._source.hasOwnProperty(['related:audio-stops']) && (
              <>
                {isPlaying ? (
                  <>
                    <Button variant="contained" size="large" className={classes.playAudioBtn} color="primary" onClick={togglePlayAudio}>
                      <i className="fas fa-pause" /> Stop audio tour
                    </Button>
                    <Sound
                      url={item._source['related:audio-stops'][0].link}
                      playStatus={Sound.status.PLAYING}
                      playFromPosition={300}
                    />
                  </>
                ) : (
                  <Button variant="contained" size="large" className={classes.playAudioBtn} color="primary" onClick={togglePlayAudio}>
                    <i className="fas fa-play" /> Play audio tour
                  </Button>
                )}
                <small
                  className={classes.audioSubtext}
                >
                  *Don&#39;t hear anything? Check the volume level on your device.
                </small>
              </>
            )}
          </div>
          <div className={classes.artInfo}>
            <Paper className={classes.root} elevation={5}>
              <div className={classes.buttons}>
                <Button variant="outlined" className={classes.backBtn} color="secondary" onClick={goBack}>
                  <i className="fas fa-chevron-left" />{' '} back
                </Button>
                {savedItem.length === 0 && (
                  <>
                    <Tooltip title="Add to favorites" placement="bottom">
                      <IconButton
                        className={classes.favoriteBtn}
                        onClick={onSaveToFavorites}
                      >
                        <StarBorderOutlined />
                      </IconButton>
                    </Tooltip>
                    <AppMessage open={isOpen} onClose={onClose} message={`The following art was successfully saved to favorites: ${item._source.title}`} variant="success" link="#" />
                  </>
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
                <Typography variant="body1">
                  {item._source.description}
                </Typography>
              </div>
              <div className={classes.artDetailsContainer}>
                <Typography variant="h5">
                  Details
                </Typography>
                <Divider />
                <ArtDetailsRow term="Title" definition={item._source.title} />
                <ArtDetailsRow term="Dated" definition={item._source.dated} />
                <ArtDetailsRow term="Artist" definition={item._source.artist === '' ? 'Not specified' : item._source.artist} />
                <ArtDetailsRow term="Nationality" definition={item._source.nationality === null || item._source.nationality === '' ? 'Not specified' : item._source.nationality} />
                <ArtDetailsRow term="Artist life" definition={item._source.life_date === null ? 'Not specified' : item._source.life_date} />
                <ArtDetailsRow term="Role" definition={item._source.role} />
                <ArtDetailsRow term="Department" definition={item._source.department} />
                <ArtDetailsRow term="Dimension" definition={item._source.dimension === '' || item._source.dimension == null ? 'Not specified' : item._source.dimension} />
                <ArtDetailsRow term="Credit" definition={item._source.creditline} />
                <ArtDetailsRow term="Accession number" definition={item._source.accession_number} />
                <ArtDetailsRow term="Medium" definition={item._source.medium} />
                <ArtDetailsRow term="Country" definition={item._source.country} />
                <ArtDetailsRow term="Century" definition={item._source.style == null ? 'Not specified' : item._source.style} />
                <ArtDetailsRow term="Rights" definition={item._source.rights_type} />
                <ArtDetailsRow term="Classification" definition={item._source.classification} />
                <ArtDetailsRow term="Object name" definition={item._source.object_name === '' || item._source.object_name == null ? 'Not specified' : item._source.object_name} />
              </div>
              {item._source.hasOwnProperty(['related:exhibitions']) && item._source['related:exhibitions'].length > 0 && (
                <div className={classes.exhibitionContainer}>
                  <Typography variant="h5">
                    Exhibitions
                  </Typography>
                  <Divider />
                  <List>
                    {item._source['related:exhibitions'].map((exhibit) => (
                      <div className={classes.exhibitListItem} key={exhibit.id}>
                        <Typography variant="h6">{exhibit.title}</Typography>
                        <Typography variant="subtitle1">{exhibit.date}</Typography>
                        <Typography variant="body1">{exhibit.description}</Typography>
                      </div>
                    ))}
                  </List>
                </div>
              )}
            </Paper>
          </div>
        </div>
      ))}
    </>
  );
};

Artwork.propTypes = {
  match: PropTypes.object.isRequired,
  artFavoritesDB: PropTypes.func.isRequired,
  artItems: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
};
