import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useUiNavBarStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    grow: {
      flexGrow: 1,
    },
    title: {
      display: 'block',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      display: 'block',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
  })
);