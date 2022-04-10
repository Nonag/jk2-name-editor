import { css, keyframes } from '@emotion/react/macro';

import theme from 'src/theme/theme';

const blink = keyframes`
  50% {
    border-color: transparent;
  }
`;

const styles = {
  stringEditor: css({
    fontWeight: 'bold',
    fontSize: '2rem',
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
    backgroundColor: theme.colors.background + '00',
    borderBottom: '3px solid transparent',

    '&:hover': css({
      background: theme.colors.background,
      cursor: 'pointer',
    }),
  }),

  coloredCharacterSelected: css({
    borderBottom: `3px solid ${theme.colors.border}`,
  }),

  hasFocus: css({
    '&:not(:hover)': {
      animation: `${blink} 0.8s step-start 0s infinite`,
    },
  }),

  spaceIndicator: css({
    color: theme.colors.border,
  }),

  colorPicker: css({
    textShadow: 'none',
    marginTop: theme.spacing(3),
    position: 'absolute',
  }),
};

export default styles;
