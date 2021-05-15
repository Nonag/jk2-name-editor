import { css } from '@emotion/react/macro';

import theme from 'src/theme/theme';

const coloredCharacterSelected = css({
  transition: 'background 0.2s ease, padding 0.2s ease, border 0.2s ease',
  backgroundColor: theme.colors.background + 'aa',
  padding: '0.1rem 0.3rem 0.1rem 0.2rem',
  border: `1px solid ${theme.colors.border}`,
  boxShadow: `1px 1px ${theme.colors.border}`,
  cursor: 'pointer',
});

const styles = {
  stringEditor: css({
    fontWeight: 'bold',
    fontSize: '2.5rem',
  }),

  coloredCharacter: css({
    backgroundColor: theme.colors.background + '00',
    padding: 0,
    border: '1px solid transparent',
    borderRadius: theme.borderRadius,
    transition: 'background 0.2s ease, padding 0.2s ease, border 0.2s ease',

    '&:hover': coloredCharacterSelected,
  }),

  coloredCharacterSelected: coloredCharacterSelected,

  spaceIndicator: css({
    color: theme.colors.border,
  }),

  colorPicker: css({
    marginTop: theme.spacing(3),
  }),
};

export default styles;
