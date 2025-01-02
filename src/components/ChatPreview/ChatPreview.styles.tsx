import { css } from '@emotion/react';
import { Theme } from '@mui/material';

const makeStyles = (theme: Theme) => ({
  chatPreview: (theme: Theme) => ({
    fontSize: theme.typography.pxToRem(22),
  }),

  colon: css({
    color: theme.palette.common.white,
  }),

  chatMessage: css({
    color: theme.palette.text.chat,
    textShadow: theme.typography.textShadow('black'),
  }),
});

export default makeStyles;
