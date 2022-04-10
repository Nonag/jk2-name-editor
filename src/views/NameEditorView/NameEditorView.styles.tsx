import { css } from '@emotion/react/macro';

import theme from 'src/theme/theme';

const styles = {
  nameEditorView: css({
    display: 'flex',
    justifyContent: 'center',
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
    maxWidth: `calc(100% - ${theme.spacing(10)}px)`,
    minHeight: '100vh',
    overflow: 'auto',
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(5),
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    flexGrow: 1,

    '@media (min-width: 940)': {
      maxWidth: `calc(940px - ${theme.spacing(20)}px)`,
      marginRight: theme.spacing(10),
      marginLeft: theme.spacing(10),
    },
  }),

  chat: css({
    padding: theme.spacing(2),
    left: 0,
    bottom: 0,
    position: 'fixed',
  }),
};

export default styles;
