import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useLandingStyles = makeStyles((theme) =>
  createStyles({
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
  })
);