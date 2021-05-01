/** @jsxImportSource @emotion/react */
import type { FC } from 'react';
import React from 'react';
import { SerializedStyles } from '@emotion/react';

import type { ColoredCharacter } from 'src/types';

import styles from './StringPreview.styles';

export interface StringPreviewProps {
  characters: ColoredCharacter[];
  css?: SerializedStyles;
  indicateSpaces?: boolean;
}

export const StringPreview: FC<StringPreviewProps> = ({
  characters,
  css,
  indicateSpaces,
  ...props
}) => {
  return (
    <span css={[styles.stringPreview, css]} {...props}>
      {characters.map((character) => (
        <span key={character.uuid}>
          {indicateSpaces && character.character === ' ' ? (
            <>&sdot;</>
          ) : (
            character.character
          )}
        </span>
      ))}
    </span>
  );
};

export default StringPreview;
