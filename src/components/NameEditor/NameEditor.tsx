/** @jsxImportSource @emotion/react */
import type {
  ChangeEvent,
  FC,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
} from 'react';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import type { ColorResult } from 'react-color';
import { SketchPicker } from 'react-color';
import type { SerializedStyles } from '@emotion/react';
import { css as emotionCss } from '@emotion/react/macro';

import type { ColoredCharacter } from 'src/types';
import { createColoredCharacters, rgbColorToString } from 'src/utils';
import { ColoredCharacter as Character } from 'src/components/ColoredCharacter/ColoredCharacter';
import StringInput from 'src/components/StringInput/StringInput';

import styles from './NameEditor.styles';

export interface StringEditorProps extends HTMLAttributes<HTMLDivElement> {
  coloredCharacters: ColoredCharacter[];
  css?: SerializedStyles | SerializedStyles[];
  onUpdate?: (coloredCharacters: ColoredCharacter[]) => void;
}

export const StringEditor: FC<StringEditorProps> = ({
  coloredCharacters,
  css,
  onUpdate = () => {},
  ...props
}) => {
  const stringInputRef = useRef<HTMLInputElement>(null);
  const [playerName, setPlayerName] = useState<string>('');
  const [stringInputHasFocus, setStringInputHasFocus] =
    useState<boolean>(false);
  const [selectedCharacter, setSelectedCharacter] = useState<
    ColoredCharacter | undefined
  >();

  /**
   * Updates the playerName value while removing or inserting characters to the coloredCharacters state accordingly.
   */
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const _coloredCharacters = [...coloredCharacters];
    const inputString = event.target.value;
    const cursorAfter = event.target.selectionStart!;
    const isInsertion = inputString.length > playerName.length;

    // The amount of characters that were inserted or deleted within a single value change.
    const diffLength = isInsertion
      ? inputString.length - playerName.length
      : playerName.length - inputString.length;

    // The cursor index before and after a deletion really is always the same, if you think of it.
    const cursorBefore = isInsertion ? cursorAfter - diffLength : cursorAfter;

    // Get the inserted sub-string of the new _input.
    const insertedString = isInsertion
      ? inputString.substring(cursorBefore, cursorAfter)
      : undefined;

    if (isInsertion) {
      _coloredCharacters.splice(
        cursorBefore,
        0,
        ...createColoredCharacters(insertedString!),
      );
    }

    if (!isInsertion) {
      _coloredCharacters.splice(cursorBefore, diffLength);
    }

    onUpdate(_coloredCharacters);
    setPlayerName(inputString);
  };

  /**
   * Update selectedCharacter depending on the cursers position inside the StringInput.
   */
  const handleCharacterSelection = (
    event: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLInputElement>,
  ) => {
    const cursorIndex = event.currentTarget.selectionStart;
    const _selectedCharacter = cursorIndex
      ? coloredCharacters[cursorIndex]
      : coloredCharacters[0];

    setSelectedCharacter(_selectedCharacter);
  };

  /**
   * Update selectedCharacter and StringInput selection depending on the clicked character.
   */
  const handleCharacterClick = (character: ColoredCharacter) => {
    if (!stringInputRef.current) return;

    const cursorIndex = coloredCharacters.indexOf(character);
    const _selectedCharacter = cursorIndex
      ? coloredCharacters[cursorIndex]
      : coloredCharacters[0];

    stringInputRef.current.setSelectionRange(cursorIndex, cursorIndex);
    stringInputRef.current.focus();

    setSelectedCharacter(_selectedCharacter);
  };

  /**
   * Update the provided coloredCharacters and pass them to the 'onUpdate' callback.
   * Also update the 'setSelectedCharacter' state in order for the color picker to work properly.
   */
  const handleColorUpdate = (color: ColorResult) => {
    const _coloredCharacters = coloredCharacters.map((coloredCharacter) => {
      if (coloredCharacter.uuid === selectedCharacter?.uuid) {
        const updatedCharacter = {
          ...coloredCharacter,
          textRGBColor: color.rgb,
          textRGBString: rgbColorToString(color.rgb),
        };

        setSelectedCharacter(updatedCharacter);
        return updatedCharacter;
      } else {
        return coloredCharacter;
      }
    });

    onUpdate(_coloredCharacters);
  };

  // Use character property to generate initial input string.
  useEffect(() => {
    const characters = coloredCharacters.map(
      (coloredCharacter) => coloredCharacter.character,
    );

    setPlayerName(characters.join(''));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ClickAwayListener onClickAway={() => setSelectedCharacter(undefined)}>
      <div css={[styles.stringEditor, css]} {...props}>
        {coloredCharacters.map((coloredCharacter) => {
          const isSelected = coloredCharacter.uuid === selectedCharacter?.uuid;
          const isWhiteSpace = coloredCharacter.character === ' ';

          return (
            <Fragment key={coloredCharacter.uuid}>
              {isWhiteSpace && <span css={styles.spaceIndicator}>&sdot;</span>}

              {!isWhiteSpace && (
                <Character
                  css={[
                    styles.coloredCharacter,
                    isSelected ? styles.coloredCharacterSelected : emotionCss``,
                    stringInputHasFocus ? styles.hasFocus : emotionCss``,
                  ]}
                  onClick={() => handleCharacterClick(coloredCharacter)}
                  {...coloredCharacter}
                />
              )}
            </Fragment>
          );
        })}

        <StringInput
          css={styles.stringInput}
          onBlur={() => setStringInputHasFocus(false)}
          onChange={handleNameChange}
          onFocus={() => setStringInputHasFocus(true)}
          onKeyUp={handleCharacterSelection}
          ref={stringInputRef}
          value={playerName}
        />

        {selectedCharacter && (
          <SketchPicker
            css={styles.colorPicker}
            color={selectedCharacter.textRGBColor}
            onChange={(color) => handleColorUpdate(color)}
          />
        )}
      </div>
    </ClickAwayListener>
  );
};

export default StringEditor;
