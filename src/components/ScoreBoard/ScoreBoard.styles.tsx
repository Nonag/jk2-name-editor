import { css } from '@emotion/react';
import { Theme } from '@mui/material';

const makeStyles = (theme: Theme) => ({
  scoreBoard: css({
    'th, td': {
      textAlign: 'left',
      minWidth: '130px',
      padding: theme.spacing(1),

      '&:first-of-type': {
        width: '100%',
      },
    },

    'tbody tr:first-of-type': {
      backgroundColor: theme.palette.primary.main + '94',
    },
  }),
});

export const sx = {
  tableContainer: (theme: Theme) => ({
    width: '100%',

    '& .MuiTableCell-root': {
      color: 'common.white',
      textShadow: theme.typography.textShadow(theme.palette.grey[700]),
      fontSize: 'h4.fontSize',
      lineHeight: 'normal',
      border: 'none',
    },
  }),
};

export default makeStyles;
