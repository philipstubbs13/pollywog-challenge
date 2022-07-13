import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';
import {
  Typography, Button, Paper, Divider, List, IconButton, Tooltip, Box,
} from '@material-ui/core';
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined';
import { useParams, useNavigate } from 'react-router-dom';
import AppMessage from '../../components/AppMessage';
import './Artwork.css';
import { useArtworkStyles } from './Artwork.styles';
import { ArtDetailsRow } from './art-details-rows/ArtDetailsRow';

export const Artwork = (props) => {
  const classes = useArtworkStyles();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [savedItem, setSavedItem] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { artFavoritesDB, artItems } = props;

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

  const addDefaultSrc = (event) => {
    event.target.src = 'https://1.api.artsmia.org/15790.jpg';
  };

  return (
    <>
      {artItems.filter((item) => item._source.id === id).map((item) => (
        <div className={classes.artworkContainer} key={item._source.id}>
          <Box display="flex" flexDirection="column">
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
                    <Box marginTop={3}>
                      <Button variant="contained" size="large" color="primary" onClick={togglePlayAudio}>
                        <i className="fas fa-pause" /> Stop audio tour
                      </Button>
                    </Box>
                    <Sound
                      url={item._source['related:audio-stops'][0].link}
                      playStatus={Sound.status.PLAYING}
                      playFromPosition={300}
                    />
                  </>
                ) : (
                  <Box marginTop={3}>
                    <Button variant="contained" size="large" color="primary" onClick={togglePlayAudio}>
                      <i className="fas fa-play" /> Play audio tour
                    </Button>
                  </Box>
                )}
                <Box marginTop={1}>
                  <Typography variant="caption">
                    *Don&#39;t hear anything? Check the volume level on your device.
                  </Typography>
                </Box>
              </>
            )}
          </Box>
          <div className={classes.artInfo}>
            <Paper className={classes.root}>
              <Box display="flex">
                <Button variant="text" className={classes.backBtn} color="secondary" onClick={() => navigate('/')}>
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
              </Box>
              <Box>
                <Typography variant="h5" component="h3">
                  {item._source.title}
                </Typography>
                <Typography variant="body1" component="h4">
                  {item._source.artist === '' ? null : item._source.artist}
                </Typography>
              </Box>
              <Box marginTop={4}>
                <Typography variant="body1">
                  {item._source.description}
                </Typography>
              </Box>
              <Box marginTop={4}>
                <Typography variant="h5">
                  Details
                </Typography>
                <Divider />
                <ArtDetailsRow term="Title" definition={item._source.title} />
                <ArtDetailsRow term="Dated" definition={item._source.dated} />
                <ArtDetailsRow term="Artist" definition={item._source.artist} />
                <ArtDetailsRow term="Nationality" definition={item._source.nationality} />
                <ArtDetailsRow term="Artist life" definition={item._source.life_date} />
                <ArtDetailsRow term="Role" definition={item._source.role} />
                <ArtDetailsRow term="Department" definition={item._source.department} />
                <ArtDetailsRow term="Dimension" definition={item._source.dimension} />
                <ArtDetailsRow term="Credit" definition={item._source.creditline} />
                <ArtDetailsRow term="Accession number" definition={item._source.accession_number} />
                <ArtDetailsRow term="Medium" definition={item._source.medium} />
                <ArtDetailsRow term="Country" definition={item._source.country} />
                <ArtDetailsRow term="Century" definition={item._source.style} />
                <ArtDetailsRow term="Rights" definition={item._source.rights_type} />
                <ArtDetailsRow term="Classification" definition={item._source.classification} />
                <ArtDetailsRow term="Object name" definition={item._source.object_name} />
              </Box>
              {item._source.hasOwnProperty(['related:exhibitions']) && item._source['related:exhibitions'].length > 0 && (
                <Box marginTop={4}>
                  <Typography variant="h5">
                    Exhibitions
                  </Typography>
                  <Divider />
                  <List>
                    {item._source['related:exhibitions'].map((exhibit) => (
                      <Box marginTop={3} key={exhibit.id}>
                        <Typography variant="h6">{exhibit.title}</Typography>
                        <Typography variant="subtitle1">{exhibit.date}</Typography>
                        <Typography variant="body1">{exhibit.description}</Typography>
                      </Box>
                    ))}
                  </List>
                </Box>
              )}
            </Paper>
          </div>
        </div>
      ))}
    </>
  );
};

Artwork.propTypes = {
  artFavoritesDB: PropTypes.func.isRequired,
  artItems: PropTypes.array.isRequired,
};
