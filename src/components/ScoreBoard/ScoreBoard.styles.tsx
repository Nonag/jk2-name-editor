import { css } from '@emotion/react';
import { Theme } from '@mui/material';

const makeStyles = (theme: Theme) => ({
  scoreBoard: css({
    color: theme.palette.common.white,
    textShadow: theme.typography.textShadow(theme.palette.grey[700]),
    fontSize: '2em',
    width: '100%',
    borderCollapse: 'collapse',

    'th, td': {
      textAlign: 'left',
      padding: theme.spacing(1),
    },

    'tbody tr:first-of-type': {
      backgroundColor: theme.palette.primary.main + '94',
    },
  }),
});

export default makeStyles;
