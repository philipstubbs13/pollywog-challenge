import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useAboutStyles = makeStyles((theme) => createStyles({
  aboutContainer: {
    marginBottom: 200,
  },
  aboutItem: {
    marginTop: 10,
    width: '50%',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      width: '70%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  root: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  aboutText: {
    marginTop: 25,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  aboutTitle: {
    marginTop: 25,
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },
}));
