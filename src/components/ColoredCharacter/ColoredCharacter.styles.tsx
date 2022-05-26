import { css } from '@emotion/react';
import { Theme } from '@mui/material';

const makeStyles = (theme: Theme) => ({
  coloredCharacter: css({
    color: theme.palette.common.white,
    textShadow: theme.typography.textShadow(theme.palette.grey[700]),
    minWidth: '0.315em', // For consecutive space characters.
    display: 'inline-block',
  }),
});

export default makeStyles;
