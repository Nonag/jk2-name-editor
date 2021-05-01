import { css } from '@emotion/react/macro';

import theme from 'src/theme/theme';

const styles = {
  stringEditor: css({
    fontWeight: 'bold',
    fontSize: '2.5rem',
  }),

  coloredCharacter: css({
    backgroundColor: theme.colors.background + '00',
    padding: theme.spacing(0.5),
    border: '1px solid transparent',
    borderRadius: theme.borderRadius,
    transition: 'background, border 0.5s',

    '&:hover': {
      backgroundColor: theme.colors.background + 'aa',
      border: `1px solid ${theme.colors.border}`,
      cursor: 'pointer',
    },
  }),

  spaceIndicator: css({
    color: theme.colors.border,
  }),
};

export default styles;
