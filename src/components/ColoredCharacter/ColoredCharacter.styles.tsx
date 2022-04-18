import { css } from '@emotion/react';
import { Theme } from '@mui/material';

const makeStyles = (theme: Theme) => ({
  coloredCharacter: css({
    color: theme.palette.common.white,
    textShadow: theme.typography.textShadow(theme.palette.grey[700]),
  }),
});

export default makeStyles;
