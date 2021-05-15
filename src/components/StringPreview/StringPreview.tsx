/** @jsxImportSource @emotion/react */
import type { FC } from 'react';
import React from 'react';
import { SerializedStyles } from '@emotion/react';
import { css as emotionCss } from '@emotion/react/macro';

import type { ColoredCharacter } from 'src/types';
import theme from 'src/theme/theme';
import { ColoredCharacter as Character } from 'src/components/ColoredCharacter/ColoredCharacter';

import styles from './StringPreview.styles';

export interface StringPreviewProps {
  characters: ColoredCharacter[];
  css?: SerializedStyles | SerializedStyles[];
  shadow?: boolean;
}

export const StringPreview: FC<StringPreviewProps> = ({
  characters,
  css,
  shadow = true,
  ...props
}) => {
  return (
    <span css={[styles.stringPreview, css]} {...props}>
      {characters.map((character) => {
        const colorOverride = emotionCss({
          color: character.textRGBString,
          textShadow: theme.textShadow(character.shadowRGBString),
        });

        return (
          <span key={character.uuid}>
            <Character css={colorOverride}>{character.character}</Character>
          </span>
        );
      })}
    </span>
  );
};

export default StringPreview;
