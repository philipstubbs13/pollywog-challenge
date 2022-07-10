import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useNoMatchStyles = makeStyles((theme) =>
  createStyles({
    noMatchContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      noMatchBtn: {
        marginTop: 20,
      },
      noMatchText: {
        color: theme.palette.common.black,
      },
      noMatchImage: {
        width: '300px',
        height: '300px',
      },
  })
);