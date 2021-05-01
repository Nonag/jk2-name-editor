/** @jsxImportSource @emotion/react */
import type { ChangeEvent, FC } from 'react';
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import type { ColoredCharacter } from 'src/types';
import StringInput from 'src/components/StringInput/StringInput';
import StringPreview from 'src/components/StringPreview/StringPreview';

import styles from './NameEditorView.styles';

export const NameEditorView: FC = () => {
  const [characters, setCharacters] = useState<ColoredCharacter[]>([]);
  const [inputString, setInputString] = useState<string>('');

  // Takes any string and returns an array with ColoredCharacter for each character in that string.
  const createColoredCharacters = (
    characterString: string,
  ): ColoredCharacter[] =>
    [...characterString].map((character) => ({
      backgroundColor: '',
      character,
      textColor: '',
      uuid: uuid(),
    }));

  // Updates the inputString value while removing or inserting ColoredCharacters to
  // the characters state accordingly.
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
    const cursorBefore = isInsertion ? cursorAfter - diffLength : cursorAfter;

    // Get the inserted sub-string of the new _input.
    const insertedString = isInsertion
      ? _inputString.substr(cursorBefore, diffLength)
      : undefined;

    if (isInsertion) {
      _characters.splice(
        cursorBefore,
        0,
        ...createColoredCharacters(insertedString!),
      );
    }

    if (!isInsertion) {
      _characters.splice(cursorBefore, diffLength);
    }

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
