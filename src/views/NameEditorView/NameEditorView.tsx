/** @jsxImportSource @emotion/react */
import type { ChangeEvent, FC } from 'react';
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import type { ColoredCharacter } from 'src/types';
import Box from 'src/components/Box/Box';
import ChatPreview from 'src/components/ChatPreview/ChatPreview';
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

  // Set default name to 'Padawan' on mount.
  useEffect(() => {
    setInputString('Padawan');
    setCharacters(createColoredCharacters('Padawan'));
  }, []);

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

          <StringPreview characters={characters} indicateSpaces />

          <StringInput onChange={handleChange} value={inputString} />
        </Box>

        <ChatPreview css={styles.chat} characters={characters} />
      </div>
    </div>
  );
};

export default NameEditorView;
