/** @jsxImportSource @emotion/react */
import type { FC } from 'react';
import React from 'react';
import type { Options } from '@emotion/cache';
import createCache from '@emotion/cache';
import { CacheProvider, Global } from '@emotion/react';

import NameEditorView from 'src/views/NameEditorView/NameEditorView';

import styles from './App.styles';

const cacheOptions: Options = {
  key: 'jk',
  ...(process.env.NODE_ENV === 'development' && { stylisPlugins: [] }),
};

const cssCache = createCache(cacheOptions);
const App: FC = () => {
  return (
    <CacheProvider value={cssCache}>
      <Global styles={[styles.normalize, styles.app]} />

      <NameEditorView />
    </CacheProvider>
  );
};

export default App;
