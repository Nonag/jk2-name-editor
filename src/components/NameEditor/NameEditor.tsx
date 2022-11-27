/** @jsxImportSource @emotion/react */
import type {
  ChangeEvent,
  FC,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
} from 'react';
import { useRef, useState } from 'react';
import type { ColorResult } from 'react-color';
import { SketchPicker } from 'react-color';
import type { SerializedStyles } from '@emotion/react';
import { css as emotionCss } from '@emotion/react/macro';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  ClickAwayListener,
  useTheme,
} from '@mui/material';
import chroma from 'chroma-js';

import type { ColoredCharacter } from 'src/types';
import { createColoredCharacters, legacyColors } from 'src/utils';
import { usePlayerName } from 'src/services/state';
import { ColoredCharacter as Character } from 'src/components/ColoredCharacter/ColoredCharacter';

import makeStyles from './NameEditor.styles';

export interface NameEditorProps extends HTMLAttributes<HTMLDivElement> {
  css?: SerializedStyles | SerializedStyles[];
}

export const NameEditor: FC<NameEditorProps> = ({ css, ...props }) => {
  const theme = useTheme();
  const cssStyles = makeStyles(theme);
  const stringInputRef = useRef<HTMLInputElement>(null);
  const { playerName, setPlayerName } = usePlayerName();
  const [editMode, setEditMode] = useState<'shadow' | 'text'>('text');
  const [stringInputHasFocus, setStringInputHasFocus] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<
    ColoredCharacter | undefined
  >();

  // Map legacy colors to an array of preset colors that can be used by the color picker.
  const presetColors = Object.entries(legacyColors).map(([title, { hex }]) => ({
    color: `#${hex}`,
    title,
  }));

  let previousCharacter: ColoredCharacter | undefined;

  /**
   * Updates the `playerName` value while removing or inserting characters to the coloredCharacters state accordingly.
   */
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const coloredCharacters = [...playerName.coloredCharacters];
    const inputString = event.target.value;
    const cursorAfter = event.target.selectionStart!;
    const isInsertion = inputString.length > playerName.name.length;

    // The amount of characters that were inserted or deleted within a single value change.
    const diffLength = isInsertion
      ? inputString.length - playerName.name.length
      : playerName.name.length - inputString.length;

    // The cursor index before and after a deletion really is always the same, if you think of it.
    const cursorBefore = isInsertion ? cursorAfter - diffLength : cursorAfter;

    // Get the inserted sub-string of the new inputString.
    const insertedString = isInsertion
      ? inputString.substring(cursorBefore, cursorAfter)
      : undefined;

    if (isInsertion) {
      coloredCharacters.splice(
        cursorBefore,
        0,
        ...createColoredCharacters(insertedString!),
      );
    }

    if (!isInsertion) {
      coloredCharacters.splice(cursorBefore, diffLength);
    }

    setPlayerName({ coloredCharacters, name: inputString });
  };

  /**
   * Update `selectedCharacter` depending on the cursors position inside the input element.
   */
  const handleCursorIndexChange = (
    event: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLInputElement>,
  ) => {
    const cursorIndex = event.currentTarget.selectionStart;
    const newSelectedCharacter = cursorIndex
      ? playerName.coloredCharacters[cursorIndex]
      : playerName.coloredCharacters[0];

    setSelectedCharacter(newSelectedCharacter);
  };

  /**
   * Update `selectedCharacter` and the input element selection depending on the clicked character.
   */
  const handleCharacterClick =
    (character: ColoredCharacter) => (event: MouseEvent<HTMLElement>) => {
      if (!stringInputRef.current) return;

      const cursorIndex = playerName.coloredCharacters.indexOf(character);
      const newSelectedCharacter = cursorIndex
        ? playerName.coloredCharacters[cursorIndex]
        : playerName.coloredCharacters[0];

      stringInputRef.current.setSelectionRange(cursorIndex, cursorIndex);
      stringInputRef.current.focus();

      setSelectedCharacter(newSelectedCharacter);
    };

  /**
   * Update the `playerName` state's `coloredCharacters`.
   * If no `color` was passed, reset the currently `selectedCharacter`.
   * Also update the `setSelectedCharacter` state in order for the color picker to work properly.
   */
  const handleColorUpdate = (color?: ColorResult) => {
    const coloredCharacters = playerName.coloredCharacters.map(
      (coloredCharacter) => {
        // Skip if coloredCharacter of current iteration is not the selectedCharacter.
        if (coloredCharacter.uuid !== selectedCharacter?.uuid)
          return coloredCharacter;

        const shadowHexColor =
          editMode === 'shadow' && color
            ? chroma(color.hex)
                .alpha(color.rgb.a || 1)
                .hex()
            : coloredCharacter.shadowHexColor;
        const textHexColor =
          editMode === 'text' && color
            ? chroma(color.hex)
                .alpha(color.rgb.a || 1)
                .hex()
            : coloredCharacter.textHexColor;

        const updatedCharacter: ColoredCharacter = {
          ...coloredCharacter,
          shadowHexColor: !!color ? shadowHexColor : undefined,
          textHexColor: !!color ? textHexColor : undefined,
        };

        setSelectedCharacter(updatedCharacter);

        return updatedCharacter;
      },
    );

    setPlayerName({ coloredCharacters, name: playerName.name });
  };

  /**
   * When focusing the input, use the cursor index to select a `coloredCharacter`.
   * This is especially useful when the input element gained focus without actually clicking on a character.
   */
  const handleInputFocus = () => {
    const cursorIndex = stringInputRef.current?.selectionStart;

    setSelectedCharacter(playerName.coloredCharacters[cursorIndex || 0]);
    setStringInputHasFocus(true);
  };

  return (
    <ClickAwayListener onClickAway={() => setSelectedCharacter(undefined)}>
      <Box
        css={[cssStyles.nameEditor, css]}
        onClick={() => stringInputRef.current?.focus()}
        {...props}
      >
        {playerName.coloredCharacters.map(
          (coloredCharacter: ColoredCharacter) => {
            const isSelected =
              coloredCharacter.uuid === selectedCharacter?.uuid;

            // If the current `coloredCharacter` was not touched and has no own colors,
            // use the `previousCharacter`'s colors, if there is one.
            const previewCharacter: ColoredCharacter = {
              ...coloredCharacter,
              character:
                coloredCharacter.character === ' '
                  ? '⋅'
                  : coloredCharacter.character,
              shadowHexColor:
                !!coloredCharacter.shadowHexColor || !previousCharacter
                  ? coloredCharacter.shadowHexColor
                  : previousCharacter.shadowHexColor,
              textHexColor:
                !!coloredCharacter.textHexColor || !previousCharacter
                  ? coloredCharacter.textHexColor
                  : previousCharacter.textHexColor,
            };

            previousCharacter = previewCharacter;

            return (
              <Character
                css={[
                  cssStyles.coloredCharacter,
                  isSelected
                    ? cssStyles.coloredCharacterSelected
                    : emotionCss``,
                  stringInputHasFocus ? cssStyles.hasFocus : emotionCss``,
                ]}
                key={coloredCharacter.uuid}
                onClick={handleCharacterClick(coloredCharacter)}
                {...previewCharacter}
              />
            );
          },
        )}

        {/* Dummy character to mimic a blinking cursor when the input is focused but no character selected. */}
        {stringInputRef.current?.selectionEnd ===
          playerName.coloredCharacters.length && (
          <Character
            css={[
              cssStyles.coloredCharacter,
              stringInputHasFocus
                ? cssStyles.coloredCharacterSelected
                : emotionCss``,
              stringInputHasFocus ? cssStyles.hasFocus : emotionCss``,
            ]}
            {...createColoredCharacters('')[0]}
          >
            &nbsp;
          </Character>
        )}

        <input
          css={cssStyles.stringInput}
          maxLength={36}
          onBlur={() => setStringInputHasFocus(false)}
          onChange={handleNameChange}
          onFocus={handleInputFocus}
          onKeyUp={handleCursorIndexChange}
          ref={stringInputRef}
          value={playerName.name}
        />

        {selectedCharacter && (
          <Card
            css={cssStyles.colorPickerWrapper}
            onClick={(event) => event.stopPropagation()}
          >
            <Box display="flex" pt={1} px={1}>
              <ButtonGroup>
                <Button
                  disableElevation
                  onClick={() => setEditMode('text')}
                  size="small"
                  sx={{ textTransform: 'capitalize' }}
                  variant={editMode === 'text' ? 'contained' : undefined}
                >
                  Text
                </Button>

                <Button
                  disableElevation
                  onClick={() => setEditMode('shadow')}
                  size="small"
                  sx={{ textTransform: 'capitalize' }}
                  variant={editMode === 'shadow' ? 'contained' : undefined}
                >
                  Shadow
                </Button>
              </ButtonGroup>

              <Button
                disabled={
                  !selectedCharacter.shadowHexColor &&
                  !selectedCharacter.textHexColor
                }
                onClick={() => handleColorUpdate()}
                size="small"
                sx={{ ml: 'auto', textTransform: 'capitalize' }}
                variant="outlined"
              >
                Reset character
              </Button>
            </Box>

            <SketchPicker
              css={cssStyles.colorPicker}
              color={
                editMode === 'text'
                  ? selectedCharacter.textHexColor
                  : selectedCharacter.shadowHexColor
              }
              onChange={(color) => handleColorUpdate(color)}
              presetColors={presetColors}
            />
          </Card>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default NameEditor;
