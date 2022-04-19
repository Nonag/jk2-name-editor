import { Theme } from '@mui/material';

import { Styles } from 'src/theme/theme';

export const styles: Styles = {
  scoreBoard: (theme: Theme) => ({
    color: 'common.white',
    width: '100%',

    '& .MuiTableCell-root': {
      color: 'common.white',
      textShadow: theme.typography.textShadow(theme.palette.grey[700]),
      fontSize: 'h4.fontSize',
      lineHeight: 'normal',
      border: 'none',
    },
  }),

  heading: (theme: Theme) => ({
    fontSize: 'h4.fontSize',
    textAlign: 'center',
    textShadow: theme.typography.textShadow(theme.palette.grey[700]),
  }),

  tableContainer: (theme: Theme) => ({
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
} as const;
