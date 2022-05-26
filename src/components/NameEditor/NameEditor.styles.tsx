import { css, keyframes } from '@emotion/react';
import { Theme } from '@mui/material';

const blink = keyframes`
  50% {
    border-color: transparent;
  }
`;

const makeStyles = (theme: Theme) => ({
  stringEditor: css({}),

  stringInput: css({
    opacity: 0,
    display: 'block',
    top: 0,
    left: 0,
    position: 'fixed',
    pointerEvents: 'none',
  }),

  coloredCharacter: css({
    backgroundColor: theme.palette.background.default + '00',
    borderBottom: '3px solid transparent',

    '&:hover': css({
      background: theme.palette.background.default + '55',
      cursor: 'pointer',
    }),
  }),

  coloredCharacterSelected: css({
    borderBottom: `3px solid ${theme.palette.grey[100]}`,
  }),

  hasFocus: css({
    animation: `${blink} 0.8s step-start 0s infinite`,
  }),

  colorPicker: css({
    textShadow: 'none',
    marginTop: theme.spacing(1),
    position: 'absolute',
  }),
});

export default makeStyles;
