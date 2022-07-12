import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useLandingStyles = makeStyles((theme) => createStyles({
  landingTitle: {
    color: theme.palette.common.black,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  loadMoreArt: {
    marginTop: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
}));
