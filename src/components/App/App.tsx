/** @jsxImportSource @emotion/react */
import type { FC } from 'react';
import React from 'react';
import { Global } from '@emotion/react'

import NameEditorView from 'src/views/NameEditorView/NameEditorView';

import styles from './App.styles';

const App: FC = () => {
  return (
    <>
      <Global styles={[styles.normalize, styles.app]} />

      <NameEditorView />
    </>
  );
}

export default App;
