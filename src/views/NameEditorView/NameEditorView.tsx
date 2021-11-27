/** @jsxImportSource @emotion/react */
import type { FC } from 'react';
import React, { useState } from 'react';

import type { ColoredCharacter } from 'src/types';
import { createColoredCharacters } from 'src/utils';
import theme from 'src/theme/theme';
import Box from 'src/components/Box/Box';
import ChatPreview from 'src/components/ChatPreview/ChatPreview';
import StringEditor from 'src/components/NameEditor/NameEditor';

import styles from './NameEditorView.styles';

export const NameEditorView: FC = () => {
  const initialCharacters = createColoredCharacters('Padawan');
  const [characters, setCharacters] =
    useState<ColoredCharacter[]>(initialCharacters);

  return (
    <div css={styles.nameEditorView}>
      <img
        css={styles.backgroundImg}
        alt="bespin_streets"
        src="/static/images/editor_background.jpg"
      />

      <div css={styles.contentContainer}>
        <Box css={styles.box}>
          <h1>Jedi Knight II Name Editor</h1>

          <p>
            Type in your desired name and modify each character's appearance in
            the preview.
          </p>

          <StringEditor
            coloredCharacters={characters}
            onUpdate={setCharacters}
            style={{ margin: theme.spacing(5) }}
          />
        </Box>

        <ChatPreview css={styles.chat} characters={characters} />
      </div>
    </div>
  );
};

export default NameEditorView;
