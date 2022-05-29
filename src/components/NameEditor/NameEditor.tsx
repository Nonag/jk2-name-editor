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
import { Box, Button, Card, ClickAwayListener, useTheme } from '@mui/material';
import chroma from 'chroma-js';

import type { ColoredCharacter } from 'src/types';
import {
  createColoredCharacters,
  defaultShadowHexColor,
  defaultTextHexColor,
} from 'src/utils';
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
  const [editMode, setEditMode] = useState<'shadow' | 'text'>('text');
  const [playerName, setPlayerName] = useState('');
  const [stringInputHasFocus, setStringInputHasFocus] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<
    ColoredCharacter | undefined
  >();

  let previousCharacter: ColoredCharacter | undefined;

  /**
   * Updates the `playerName` value while removing or inserting characters to the coloredCharacters state accordingly.
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
   * Update `selectedCharacter` depending on the cursors position inside the input element.
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
   * Update `selectedCharacter` and the input element selection depending on the clicked character.
   */
  const handleCharacterClick =
    (character: ColoredCharacter) => (event: MouseEvent<HTMLElement>) => {
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
   * Update the provided `coloredCharacters` and pass them to the `onUpdate` callback.
   * If no `color` was passed, reset the currently `selectedCharacter`.
   * Also update the `setSelectedCharacter` state in order for the color picker to work properly.
   */
  const handleColorUpdate = (color?: ColorResult) => {
    const _coloredCharacters = coloredCharacters.map((coloredCharacter) => {
      if (coloredCharacter.uuid === selectedCharacter?.uuid) {
        let shadowHexColor = color
          ? chroma(color.hex)
              .alpha(color.rgb.a || 1)
              .hex()
          : defaultShadowHexColor;
        let textHexColor = color
          ? chroma(color.hex)
              .alpha(color.rgb.a || 1)
              .hex()
          : defaultTextHexColor;

        shadowHexColor =
          editMode === 'shadow' || !color
            ? shadowHexColor
            : coloredCharacter.shadowHexColor;
        textHexColor =
          editMode === 'text' || !color
            ? textHexColor
            : coloredCharacter.textHexColor;

        const updatedCharacter: ColoredCharacter = {
          ...coloredCharacter,
          shadowHexColor,
          textHexColor,
          touched: !!color,
        };

        setSelectedCharacter(updatedCharacter);
        return updatedCharacter;
      } else {
        return coloredCharacter;
      }
    });

    onUpdate(_coloredCharacters);
  };

  /**
   * When focusing the input, use the cursor index to select a `coloredCharacter`.
   * This is especially useful when the input element gained focus without actually clicking on a character.
   */
  const handleInputFocus = () => {
    const cursorIndex = stringInputRef.current?.selectionStart;

    setSelectedCharacter(coloredCharacters[cursorIndex || 0]);
    setStringInputHasFocus(true);
  };

  // Use `coloredCharacters` property to generate initial input string.
  useEffect(() => {
    const characters = coloredCharacters.map(
      (coloredCharacter) => coloredCharacter.character,
    );

    setPlayerName(characters.join(''));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ClickAwayListener onClickAway={() => setSelectedCharacter(undefined)}>
      <Box
        css={[cssStyles.nameEditor, css]}
        onClick={() => stringInputRef.current?.focus()}
        {...props}
      >
        {coloredCharacters.map((coloredCharacter: ColoredCharacter) => {
          const isSelected = coloredCharacter.uuid === selectedCharacter?.uuid;

          // If the current coloredCharacter was not touched and has no own colors,
          // use the previousCharacter's colors, if there is one.
          const previewCharacter: ColoredCharacter = {
            ...coloredCharacter,
            character:
              coloredCharacter.character === ' '
                ? '⋅'
                : coloredCharacter.character,
            shadowHexColor:
              coloredCharacter.touched || !previousCharacter
                ? coloredCharacter.shadowHexColor
                : previousCharacter.shadowHexColor,
            textHexColor:
              coloredCharacter.touched || !previousCharacter
                ? coloredCharacter.textHexColor
                : previousCharacter.textHexColor,
          };

          if (coloredCharacter.touched) previousCharacter = coloredCharacter;

          return (
            <Character
              css={[
                cssStyles.coloredCharacter,
                isSelected ? cssStyles.coloredCharacterSelected : emotionCss``,
                stringInputHasFocus ? cssStyles.hasFocus : emotionCss``,
              ]}
              key={coloredCharacter.uuid}
              onClick={handleCharacterClick(coloredCharacter)}
              {...previewCharacter}
            />
          );
        })}

        {stringInputRef.current?.selectionEnd === coloredCharacters.length && (
          <Character // Dummy character to mimic a blinking cursor when the input is focused but no character selected.
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
          onBlur={() => setStringInputHasFocus(false)}
          onChange={handleNameChange}
          onFocus={handleInputFocus}
          onKeyUp={handleCharacterSelection}
          ref={stringInputRef}
          value={playerName}
        />

        {selectedCharacter && (
          <Card
            css={cssStyles.colorPickerWrapper}
            onClick={(event) => event.stopPropagation()}
          >
            <Box display="flex" pt={1} px={1}>
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

              <Button
                disabled={!selectedCharacter.touched}
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
            />
          </Card>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default NameEditor;
