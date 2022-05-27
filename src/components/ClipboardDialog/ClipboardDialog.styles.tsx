import { Theme } from '@mui/material';

import { Styles } from 'src/theme/theme';

export const styles: Styles = {
  clipboardModal: (theme: Theme) => ({}),

  pre: (theme: Theme) => ({
    backgroundColor: theme.palette.grey[100],
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: `${theme.shape.borderRadius}px`,
    maxWidth: '100%',
    width: '100%',
    overflow: 'auto',
  }),

  code: (theme: Theme) => ({
    fontFamily: 'monospace',
  }),
} as const;
