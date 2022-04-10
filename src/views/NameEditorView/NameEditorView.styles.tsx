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
    maxWidth: '100%',
    minHeight: '100vh',
    marginRight: theme.spacing(10),
    marginLeft: theme.spacing(10),
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flexGrow: 1,
  }),

  chat: css({
    padding: theme.spacing(2),
    left: 0,
    bottom: 0,
    position: 'fixed',
  }),
};

export default styles;
