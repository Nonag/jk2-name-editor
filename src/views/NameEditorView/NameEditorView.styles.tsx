import { css } from '@emotion/react';
import { Theme } from '@mui/material';

import { Styles } from 'src/theme/theme';

export const styles: Styles = {
  nameEditorView: (theme: Theme) => ({}),

  clipboardIcon: {
    color: 'white',
  },

  chat: {
    padding: 2,
    left: 0,
    bottom: 0,
    position: 'fixed',
  },
} as const;

const makeStyles = (theme: Theme) => ({
  backgroundImg: css({
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
  }),
});

export default makeStyles;
