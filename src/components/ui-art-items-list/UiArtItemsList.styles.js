import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useUiArtItemsListStyles = makeStyles((theme) => createStyles({
  artTitle: {
    fontWeight: 'bold',
  },
  artContainer: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
}));
