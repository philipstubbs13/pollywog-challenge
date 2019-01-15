// Global import of React.
import React, { Component } from 'react';
// import third party linking library.
import { Link } from 'react-router-dom';
// import PropTypes for defining/checking component props.
import PropTypes from 'prop-types';
// import styling and components from material-ui library
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
  backBtn: {
    marginBottom: 20,
  },
});

// Class based React component for the Artwork Details page/container
class Artwork extends Component {
  render() {
    // ES6 destructuring
    const { classes } = this.props;
    // Grab the list of artItems from component state.
    const { artItems } = this.props.location.state;
    console.log(artItems);
    // Grab the id of the specific artwork from props/url
    const { id } = this.props.match.params;

    return (
      <React.Fragment>
        {/* Here, we are filtering the artItems array */}
        {/* To find a particular artwork by the id passed as a param in the url. */}
        {artItems.filter(item => item._source.id == id).map(item => (
          <div className={classes.artworkContainer}>
            <div className={classes.art}>
              <img
                src={`https://1.api.artsmia.org/${id}.jpg`}
                alt={item._source.title}
                className={classes.artImage}
              />
            </div>
            <div className={classes.artInfo}>
              <Paper className={classes.root} elevation={5}>
                <Button variant="contained" className={classes.backBtn} color="primary" component={Link} to="/home">
                  <i className="fas fa-chevron-left" />{' '} back
                </Button>
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
                {/* {item._source["related:exhibitions"].length > 0 && (
                  <div className={classes.exhibitionContainer}>
                    <Typography variant="h5">
                      Exhibitions
                    </Typography>
                    <Divider />
                    <List>
                      {item._source["related:exhibitions"].map(exhibit => (
                        <React.Fragment>
                          <ListItem>
                            <ListItemText primary={exhibit.title} secondary={exhibit.date} />
                          </ListItem>
                        </React.Fragment>
                      ))}
                    </List>
                  </div>
                )} */}
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
};

// export the component from this file.
export default withStyles(styles)(Artwork);
