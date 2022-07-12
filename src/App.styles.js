import { makeStyles, createStyles } from '@material-ui/core/styles';
import { theme } from './theme/theme';

export const useAppStyles = makeStyles(() => createStyles({
  appPages: {
    backgroundColor: '#e0e0e0',
    margin: '2.4rem',
    paddingBottom: theme.spacing(8),
    // flex: 1,
  },
}));
