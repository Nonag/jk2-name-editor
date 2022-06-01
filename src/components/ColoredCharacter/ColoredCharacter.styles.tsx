import { css } from '@emotion/react';
import { Theme } from '@mui/material';

import { defaultShadowHexColor, defaultTextHexColor } from 'src/utils';

const makeStyles = (
  theme: Theme,
  {
    shadowHexColor = defaultShadowHexColor,
    textHexColor = defaultTextHexColor,
  },
) => ({
  coloredCharacter: css({
    color: textHexColor,
    textShadow: theme.typography.textShadow(shadowHexColor),
    minWidth: '0.315em', // For consecutive space characters.
    display: 'inline-block',
  }),
});

export default makeStyles;
