import { css } from '@emotion/react/macro';

import theme from 'src/theme/theme';

const styles = {
  scoreBoard: css({
    color: theme.colors.white,
    textShadow: theme.textShadow(theme.colors.shadow),
    fontSize: '2em',
    width: '100%',
    padding: theme.spacing(4),
    borderCollapse: 'collapse',

    'th, td': {
      textAlign: 'left',
      padding: theme.spacing(3),
    },

    'tbody tr:first-of-type': {
      backgroundColor: theme.colors.primary + '94',
    },
  }),
};

export default styles;
