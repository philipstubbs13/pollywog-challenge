import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useHelpStyles = makeStyles((theme) =>
  createStyles({
    helpContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 200,
      },
      helpItem: {
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
        width: '100%',
      },
      heading: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
        [theme.breakpoints.down('sm')]: {
          fontSize: theme.typography.pxToRem(15),
        },
      },
      helpText: {
        marginTop: 25,
      },
      helpTitle: {
        color: theme.palette.common.black,
        [theme.breakpoints.down('sm')]: {
          fontSize: 20,
        },
      },
      topic: {
        marginTop: 20,
      },
  })
);