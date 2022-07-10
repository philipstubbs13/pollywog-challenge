import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useUiArtItemsListStyles = makeStyles((theme) =>
  createStyles({
    artItem: {
      marginTop: 20,
      flex: 1,
      marginLeft: 6,
      marginRight: 6,
    },
    artTitle: {
      color: theme.palette.common.black,
      fontWeight: 'bold',
    },
    artContainer: {
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
      },
    },
  })
);