import { css } from '@emotion/react/macro';

import theme from 'src/theme/theme';

const styles = {
  chatPreview: css({
    fontWeight: 'bold',
  }),

  colon: css({
    color: theme.colors.white,
  }),

  chatMessage: css({
    color: theme.colors.chat,
  }),
};

export default styles;
