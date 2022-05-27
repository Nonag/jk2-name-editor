import { css } from '@emotion/react';
import { Theme } from '@mui/material';

import { Styles } from 'src/theme/theme';

export const styles: Styles = {
  chatPreview: (theme: Theme) => ({
    fontSize: theme.typography.pxToRem(18),
  }),
} as const;

const makeStyles = (theme: Theme) => ({
  colon: css({
    color: theme.palette.common.white,
  }),

  chatMessage: css({
    color: theme.palette.text.chat,
    textShadow: theme.typography.textShadow('black'),
  }),
});

export default makeStyles;
