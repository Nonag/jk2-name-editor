import { css } from '@emotion/react/macro';

import theme from 'src/theme/theme';

const styles = {
  coloredCharacter: css({
    color: theme.colors.white,
    textShadow: theme.textShadow(theme.colors.shadow),
  }),
};

export default styles;
