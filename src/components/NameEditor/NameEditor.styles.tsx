import { css, keyframes } from '@emotion/react';
import { Theme } from '@mui/material';

const blink = keyframes`
  50% {
    border-color: transparent;
  }
`;

const makeStyles = (theme: Theme) => ({
  nameEditor: css({
    minHeight: theme.spacing(5),
  }),

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

  colorPickerWrapper: css({
    width: '300px',
    marginTop: theme.spacing(2),
    position: 'absolute',
  }),

  colorPicker: css({
    textShadow: 'none',
    width: 'auto !important', // Important is needed to override package inline styles.
    padding: `${theme.spacing(1, 1, 0)} !important`, // Important is needed to override package inline styles.
    boxShadow: 'none !important', // Important is needed to override package inline styles.
  }),
});

export default makeStyles;
