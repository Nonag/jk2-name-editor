/** @jsxImportSource @emotion/react */
import type { ChangeEvent, FC } from 'react';
import React, { useState } from 'react';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';

import type { ColoredCharacter } from 'src/types';
import StringInput from 'src/components/StringInput/StringInput';
import StringPreview from 'src/components/StringPreview/StringPreview';

import styles from './NameEditorView.styles';

export const NameEditorView: FC = () => {
  const [characters, setCharacters] = useState<ColoredCharacter[]>([]);
  const [inputString, setInputString] = useState<string>('');

  const createColoredCharacter = (character: string): ColoredCharacter => ({
    backgroundColor: '',
    character,
    textColor: '',
    uuid: uuid(),
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const _characters = [...characters];
    const _inputString = event.target.value;
    const cursorAfter = event.target.selectionStart!;
    const isInsertion = _inputString.length > inputString.length;

    // The amount of characters that were inserted or deleted within a single value change.
    const diffLength = isInsertion
      ? _inputString.length - inputString.length
      : inputString.length - _inputString.length;

    // The cursor index before and after a deletion really is always the same, if you think of it.
    const cursorBefore = isInsertion
      ? cursorAfter - diffLength
      : cursorAfter;

    if (isInsertion)
      _characters.splice(cursorBefore, 0, createColoredCharacter(_inputString.substr(cursorBefore, cursorAfter)))
      console.log('hinzugefügt an index', cursorBefore)

    if (!isInsertion)
      _characters.splice(cursorBefore, diffLength);
      console.log('entfernt an index', cursorBefore)

    console.log(createColoredCharacter(_inputString.substr(cursorBefore, cursorAfter)));

    setCharacters(_characters);
    setInputString(_inputString);
  };

  return (
    <div css={styles.nameEditorView}>
      <h1>Jedi Knight II Name Editor</h1>

      <p>
        Type in your desired name and modify each character's appearance in the
        preview.
      </p>

      <StringPreview characters={characters} />

      <StringInput onChange={handleChange} value={inputString} />
    </div>
  );
};

export default NameEditorView;
