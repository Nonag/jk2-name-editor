/** @jsxImportSource @emotion/react */
import type { FC } from 'react';
import React, { useState } from 'react';

import type { ColoredCharacter } from 'src/types';
import { createColoredCharacters } from 'src/utils';
import ChatPreview from 'src/components/ChatPreview/ChatPreview';
import NameEditor from 'src/components/NameEditor/NameEditor';
import ScoreBoard from 'src/components/ScoreBoard/ScoreBoard';

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
        <ScoreBoard>
          <tr>
            <td>
              <NameEditor
                coloredCharacters={characters}
                onUpdate={setCharacters}
              />
            </td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
        </ScoreBoard>

        <ChatPreview css={styles.chat} characters={characters} />
      </div>
    </div>
  );
};

export default NameEditorView;
