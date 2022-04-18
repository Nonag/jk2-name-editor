/** @jsxImportSource @emotion/react */
import type { FC } from 'react';
import type { Options } from '@emotion/cache';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';

import theme from 'src/theme/theme';
import NameEditorView from 'src/views/NameEditorView/NameEditorView';

// Disable css vendor prefixes for development.
// https://github.com/emotion-js/emotion/issues/2212#issuecomment-760988427
const cacheOptions: Options = {
  key: 'jk',
  ...(process.env.NODE_ENV === 'development' && { stylisPlugins: [] }),
};

const cssCache = createCache(cacheOptions);

const App: FC = () => {
  return (
    <CacheProvider value={cssCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <NameEditorView />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
