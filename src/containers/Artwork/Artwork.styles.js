import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useArtworkStyles = makeStyles((theme) => createStyles({
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
    padding: theme.spacing(4),
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
  backBtn: {
    marginBottom: 20,
  },
  favoriteBtn: {
    marginBottom: 20,
    marginLeft: 'auto',
  },
}));
