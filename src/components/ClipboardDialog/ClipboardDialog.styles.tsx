import { Theme } from '@mui/material';

import { Styles } from 'src/theme/theme';

export const styles: Styles = {
  clipboardModal: (theme: Theme) => ({}),

  pre: (theme: Theme) => ({
    overflow: 'auto',
    maxWidth: '100%',
  }),

  code: (theme: Theme) => ({
    fontFamily: 'monospace',
  }),
} as const;
