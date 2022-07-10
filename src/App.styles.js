import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useAppStyles = makeStyles(() =>
  createStyles({
    appPages: {
        margin: '2.4rem',
        flex: 1,
      },
  })
);