import { css } from '@emotion/react/macro';

import theme from 'src/theme/theme';

const coloredCharacterSelected = css({
  transition: 'border 0.2s ease',
  borderBottom: `3px solid ${theme.colors.border}`,
  cursor: 'pointer',
});

const styles = {
  stringEditor: css({
    fontWeight: 'bold',
    fontSize: '2.5rem',
  }),

  stringInput: css({
    opacity: 0.2,
    display: 'block',
    pointerEvents: 'none',
  }),

  coloredCharacter: css({
    backgroundColor: theme.colors.background + '00',
    borderBottom: '3px solid transparent',
    transition: 'border 0.2s ease',

    '&:hover': coloredCharacterSelected,
  }),

  coloredCharacterSelected,

  spaceIndicator: css({
    color: theme.colors.border,
  }),

  colorPicker: css({
    marginTop: theme.spacing(3),
  }),
};

export default styles;
