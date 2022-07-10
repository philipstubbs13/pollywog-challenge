import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useArtDetailsRowStyles = makeStyles((theme) =>
  createStyles({
    term: {
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        fontWeight: 'bold',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'row',
            width: '100%',
        },
    },
    definition: {
        display: 'flex',
        flexDirection: 'column',
        width: '60%',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'row',
            width: '100%',
        },
    },
  })
);