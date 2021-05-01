import { css } from '@emotion/react/macro';

import theme from 'src/theme/theme';

const styles = {
  box: css({
    backgroundColor: theme.colors.background,
    padding: theme.spacing(4),
  }),

  border: css({
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius,
  }),
};

export default styles;
