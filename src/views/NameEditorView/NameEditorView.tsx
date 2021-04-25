/** @jsxImportSource @emotion/react */
import type { FC, ChangeEvent } from 'react';
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import type { ColoredCharacter } from 'src/types';
import StringInput from 'src/components/StringInput/StringInput';
import StringPreview from 'src/components/StringPreview/StringPreview';

import styles from './NameEditorView.styles';

export const NameEditorView: FC = () => {
  const [characters, setCharacters] = useState<ColoredCharacter[]>([]);
  const [inputString, setInputString] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const _inputString = event.target.value;

    // TODO: Map each character to 'ColoredCharacter[]'

    setInputString(_inputString);
  };

  return (
    <div css={styles.nameEditorView}>
      <h1>Jedi Knight II Name Editor</h1>

      <p>Type in your desired name and modify each character's appearance in the preview.</p>

      <hr />

      <StringPreview characters={characters} />

      <StringInput onChange={handleChange} value={inputString} />
    </div>
  );
}

export default NameEditorView;
