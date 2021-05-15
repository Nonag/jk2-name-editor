/** @jsxImportSource @emotion/react */
import type { FC, HTMLAttributes } from 'react';
import React, { Fragment, useState } from 'react';
import type { ColorResult } from 'react-color';
import { SketchPicker } from 'react-color';
import type { SerializedStyles } from '@emotion/react';
import { css as emotionCss } from '@emotion/react/macro';

import type { ColoredCharacter } from 'src/types';
import { rgbColorToString } from 'src/utils';
import theme from 'src/theme/theme';
import { ColoredCharacter as Character } from 'src/components/ColoredCharacter/ColoredCharacter';

import styles from './StringEditor.styles';

export interface StringEditorProps extends HTMLAttributes<HTMLDivElement> {
  characters: ColoredCharacter[];
  css?: SerializedStyles | SerializedStyles[];
  onColorUpdate?: (coloredCharacters: ColoredCharacter[]) => void;
}

export const StringEditor: FC<StringEditorProps> = ({
  characters,
  css,
  onColorUpdate,
  ...props
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<
    ColoredCharacter | undefined
  >();

  // Toggle the selection of the clicked character.
  const handleCharacterClick = (_character: ColoredCharacter) => {
    const character = characters.find(
      (character) => character.uuid === _character.uuid,
    );

    if (character?.uuid === selectedCharacter?.uuid) {
      setSelectedCharacter(undefined);
    } else {
      setSelectedCharacter(character);
    }
  };

  // Update the provided characters and pass them to the 'onColorUpdate' callback.
  // Also update the 'selectedColor' state in order for the color picker to work properly.
  const handleColorUpdate = (color: ColorResult) => {
    const _characters = characters.map((_character) => {
      if (_character.uuid === selectedCharacter?.uuid) {
        const updatedCharacter = {
          ..._character,
          textRGBColor: color.rgb,
          textRGBString: rgbColorToString(color.rgb),
        };

        setSelectedCharacter(updatedCharacter);
        return updatedCharacter;
      } else {
        return _character;
      }
    });

    onColorUpdate!(_characters);
  };

  return (
    <div css={[styles.stringEditor, css]} {...props}>
      {characters.map((character) => {
        const isSelected = character.uuid === selectedCharacter?.uuid;
        const colorOverride = emotionCss({
          color: character.textRGBString,
          textShadow: theme.textShadow(character.shadowRGBString),
        });

        return (
          <Fragment key={character.uuid}>
            {character.character === ' ' ? (
              <span css={styles.spaceIndicator}>&sdot;</span>
            ) : (
              <Character
                css={[
                  styles.coloredCharacter,
                  isSelected ? styles.coloredCharacterSelected : emotionCss``,
                  colorOverride,
                ]}
                onClick={() => handleCharacterClick(character)}
              >
                {character.character}
              </Character>
            )}
          </Fragment>
        );
      })}

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
