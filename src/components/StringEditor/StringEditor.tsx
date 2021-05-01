/** @jsxImportSource @emotion/react */
import type { FC, HTMLAttributes } from 'react';
import React, { Fragment, useState } from 'react';
import type { SerializedStyles } from '@emotion/react';
import { css as emotionCss } from '@emotion/react/macro';

import type { ColoredCharacter } from 'src/types';
import theme from 'src/theme/theme';
import { ColoredCharacter as Character } from 'src/components/ColoredCharacter/ColoredCharacter';

import styles from './StringEditor.styles';

export interface ChatPreviewProps extends HTMLAttributes<HTMLDivElement> {
  characters: ColoredCharacter[];
  css?: SerializedStyles | SerializedStyles[];
  onColorUpdate?: (coloredCharacters: ColoredCharacter[]) => void;
}

export const ChatPreview: FC<ChatPreviewProps> = ({
  characters,
  css,
  onColorUpdate,
  ...props
}) => {
  const [colorPickerIsopen, setColorPickerIsopen] = useState(false);

  const handleCharacterClick = (character: ColoredCharacter) => {
    const _characters = characters.map((_character) => {
      if (_character.uuid === character.uuid) {
        return {
          ..._character,
          shadowColor: 'pink',
          textColor: 'hotpink',
        };
      } else {
        return _character;
      }
    });

    setColorPickerIsopen(!colorPickerIsopen);
    onColorUpdate!(_characters);
  };

  return (
    <div css={[styles.stringEditor, css]} {...props}>
      {characters.map((character) => {
        const colorOverride = emotionCss({
          color: character.textColor,
          textShadow: theme.textShadow(character.shadowColor),
        });

        return (
          <Fragment key={character.uuid}>
            {character.character === ' ' ? (
              <span css={styles.spaceIndicator}>&sdot;</span>
            ) : (
              <Character
                css={[styles.coloredCharacter, colorOverride]}
                onClick={() => handleCharacterClick(character)}
              >
                {character.character}
              </Character>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default ChatPreview;
