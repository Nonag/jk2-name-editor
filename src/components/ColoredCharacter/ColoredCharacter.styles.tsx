import { css } from '@emotion/react';
import { Theme } from '@mui/material';

const makeStyles = (
  theme: Theme,
  {
    shadowHexColor = theme.palette.grey[700],
    textHexColor = theme.palette.common.white,
  }: { shadowHexColor: string; textHexColor: string },
) => ({
  coloredCharacter: css({
    color: textHexColor,
    textShadow: theme.typography.textShadow(shadowHexColor),
    minWidth: '0.315em', // For consecutive space characters.
    display: 'inline-block',
  }),
});

export default makeStyles;
