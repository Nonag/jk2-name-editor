import { Theme } from '@mui/material';

import { Styles } from 'src/theme/theme';

export const styles: Styles = {
  clipboardModal: (theme: Theme) => ({}),

  pre: (theme: Theme) => ({
    maxWidth: '100%',
    overflow: 'auto',
  }),

  code: (theme: Theme) => ({
    fontFamily: 'monospace',
  }),
} as const;
