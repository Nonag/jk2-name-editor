/** @jsxImportSource @emotion/react */
import type {
  ChangeEvent,
  FC,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
} from 'react';
import { useEffect, useRef, useState } from 'react';
import type { ColorResult } from 'react-color';
import { SketchPicker } from 'react-color';
import type { SerializedStyles } from '@emotion/react';
import { css as emotionCss } from '@emotion/react/macro';
import { Box, ClickAwayListener, useTheme } from '@mui/material';
import chroma from 'chroma-js';

import type { ColoredCharacter } from 'src/types';
import { createColoredCharacters } from 'src/utils';
import { ColoredCharacter as Character } from 'src/components/ColoredCharacter/ColoredCharacter';

import makeStyles from './NameEditor.styles';

export interface NameEditorProps extends HTMLAttributes<HTMLDivElement> {
  coloredCharacters: ColoredCharacter[];
  css?: SerializedStyles | SerializedStyles[];
  onUpdate?: (coloredCharacters: ColoredCharacter[]) => void;
}

export const NameEditor: FC<NameEditorProps> = ({
  coloredCharacters,
  css,
  onUpdate = () => {},
  ...props
}) => {
  const theme = useTheme();
  const cssStyles = makeStyles(theme);
  const stringInputRef = useRef<HTMLInputElement>(null);
  const [playerName, setPlayerName] = useState('');
  const [stringInputHasFocus, setStringInputHasFocus] = useState(false);
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

    // Get the inserted sub-string of the new inputString.
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
   * Update 'selectedCharacter' depending on the cursers position inside the 'StringInput'.
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
   * Update 'selectedCharacter' and 'StringInput' selection depending on the clicked character.
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
   * Update the provided 'coloredCharacters' and pass them to the 'onUpdate' callback.
   * Also update the 'setSelectedCharacter' state in order for the color picker to work properly.
   */
  const handleColorUpdate = (color: ColorResult) => {
    const _coloredCharacters = coloredCharacters.map((coloredCharacter) => {
      if (coloredCharacter.uuid === selectedCharacter?.uuid) {
        const updatedCharacter: ColoredCharacter = {
          ...coloredCharacter,
          textHexColor: chroma(color.hex)
            .alpha(color.rgb.a || 1)
            .hex(),
        };

        setSelectedCharacter(updatedCharacter);
        return updatedCharacter;
      } else {
        return coloredCharacter;
      }
    });

    onUpdate(_coloredCharacters);
  };

  // Use 'coloredCharacters' property to generate initial input string.
  useEffect(() => {
    const characters = coloredCharacters.map(
      (coloredCharacter) => coloredCharacter.character,
    );

    setPlayerName(characters.join(''));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ClickAwayListener onClickAway={() => setSelectedCharacter(undefined)}>
      <Box css={[cssStyles.nameEditor, css]} {...props}>
        {coloredCharacters.map((coloredCharacter: ColoredCharacter) => {
          const isSelected = coloredCharacter.uuid === selectedCharacter?.uuid;
          const character = coloredCharacter.character;
          const isWhiteSpace = character === ' ';

          return (
            <Character
              css={[
                cssStyles.coloredCharacter,
                isSelected ? cssStyles.coloredCharacterSelected : emotionCss``,
                stringInputHasFocus ? cssStyles.hasFocus : emotionCss``,
              ]}
              key={coloredCharacter.uuid}
              onClick={() => handleCharacterClick(coloredCharacter)}
              {...coloredCharacter}
              character={isWhiteSpace ? '⋅' : character} // Override character only after spreading `coloredCharacter`.
            />
          );
        })}

        <input
          css={cssStyles.stringInput}
          onBlur={() => setStringInputHasFocus(false)}
          onChange={handleNameChange}
          onFocus={() => setStringInputHasFocus(true)}
          onKeyUp={handleCharacterSelection}
          ref={stringInputRef}
          value={playerName}
        />

        {selectedCharacter && (
          <SketchPicker
            css={cssStyles.colorPicker}
            color={selectedCharacter.textRGBColor}
            onChange={(color) => handleColorUpdate(color)}
          />
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default NameEditor;
