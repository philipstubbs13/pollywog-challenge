import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useFavoritesStyles = makeStyles((theme) =>
  createStyles({
    favoritesTitle: {
        fontWeight: 'bold',
        color: theme.palette.common.black,
      },
      noFavorites: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 200,
      },
      favoritesContainer: {
        marginBottom: 200,
      },
      noFavoritesContent: {
        color: theme.palette.common.black,
      },
  })
);