import { css } from '@emotion/react';
import { Theme } from '@mui/material';

const makeStyles = (theme: Theme) => ({
  backgroundImg: css({
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
  }),

  chat: css({
    padding: theme.spacing(2),
    left: 0,
    bottom: 0,
    position: 'fixed',
  }),
});

export default makeStyles;
