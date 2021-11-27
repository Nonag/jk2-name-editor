/** @jsxImportSource @emotion/react */
import type {
  ChangeEvent,
  FC,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
} from 'react';
import React, { Fragment, useEffect, useState } from 'react';
import type { ColorResult } from 'react-color';
import { SketchPicker } from 'react-color';
import type { SerializedStyles } from '@emotion/react';
import { css as emotionCss } from '@emotion/react/macro';

import type { ColoredCharacter } from 'src/types';
import { createColoredCharacters, rgbColorToString } from 'src/utils';
import theme from 'src/theme/theme';
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
  onUpdate,
  ...props
}) => {
  const [inputString, setInputString] = useState<string>('');
  const [selectedCharacter, setSelectedCharacter] = useState<
    ColoredCharacter | undefined
  >();

  // Updates the inputString value while removing or inserting characters to the coloredCharacters state accordingly.
  const handleInputStringChange = (event: ChangeEvent<HTMLInputElement>) => {
    const _coloredCharacters = [...coloredCharacters];
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
      _coloredCharacters.splice(
        cursorBefore,
        0,
        ...createColoredCharacters(insertedString!),
      );
    }

    if (!isInsertion) {
      _coloredCharacters.splice(cursorBefore, diffLength);
    }

    onUpdate!(_coloredCharacters);
    setInputString(_inputString);
  };

  // Update selected character depending on the cursers position inside the StringInput.
  const handleCharacterSelection = (
    event: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLInputElement>,
  ) => {
    console.log(event.currentTarget.selectionStart);
  };

  // Toggle the selection of the clicked character.
  const handleCharacterClick = (_character: ColoredCharacter) => {
    const character = coloredCharacters.find(
      (coloredCharacter) => coloredCharacter.uuid === _character.uuid,
    );

    if (character?.uuid === selectedCharacter?.uuid) {
      setSelectedCharacter(undefined);
    } else {
      setSelectedCharacter(character);
    }
  };

  // Update the provided coloredCharacters and pass them to the 'onUpdate' callback.
  // Also update the 'setSelectedCharacter' state in order for the color picker to work properly.
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

    onUpdate!(_coloredCharacters);
  };

  // Use character property to generate initial input string.
  useEffect(() => {
    const characters = coloredCharacters.map(
      (coloredCharacter) => coloredCharacter.character,
    );

    setInputString(characters.join(''));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div css={[styles.stringEditor, css]} {...props}>
      {coloredCharacters.map((coloredCharacter) => {
        const isSelected = coloredCharacter.uuid === selectedCharacter?.uuid;
        const colorOverride = emotionCss({
          color: coloredCharacter.textRGBString,
          textShadow: theme.textShadow(coloredCharacter.shadowRGBString),
        });

        return (
          <Fragment key={coloredCharacter.uuid}>
            {coloredCharacter.character === ' ' ? (
              <span css={styles.spaceIndicator}>&sdot;</span>
            ) : (
              <Character
                css={[
                  styles.coloredCharacter,
                  isSelected ? styles.coloredCharacterSelected : emotionCss``,
                  colorOverride,
                ]}
                onClick={() => handleCharacterClick(coloredCharacter)}
              >
                {coloredCharacter.character}
              </Character>
            )}
          </Fragment>
        );
      })}

      <StringInput
        onChange={handleInputStringChange}
        onClick={handleCharacterSelection}
        onKeyUp={handleCharacterSelection}
        value={inputString}
      />

      {selectedCharacter && (
        <SketchPicker
          css={styles.colorPicker}
          color={selectedCharacter.textRGBColor}
          onChange={(color) => handleColorUpdate(color)}
        />
      )}
    </div>
  );
};

export default StringEditor;
