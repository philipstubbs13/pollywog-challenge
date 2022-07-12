import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#263238',
    },
    secondary: {
      main: '#fff',
    },
  },
  typography: {
    fontSize: 12,
    useNextVariants: true,
  },
});
