import { css } from '@emotion/react/macro';

import theme from 'src/theme/theme';

const styles = {
  nameEditorView: css({
    display: 'flex',
  }),

  backgroundImg: css({
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
  }),

  contentContainer: css({
    width: '100vw',
    minHeight: '100vh',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  }),

  box: css({
    backgroundColor: theme.colors.background + 'ed',
    maxWidth: '70%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  }),

  chat: css({
    padding: theme.spacing(2),
    left: 0,
    bottom: 0,
    position: 'absolute',
  }),
};

export default styles;
