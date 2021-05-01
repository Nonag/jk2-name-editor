/** @jsxImportSource @emotion/react */
import type { FC } from 'react';
import React from 'react';

import type { ColoredCharacter } from 'src/types';

import styles from './StringPreview.styles';

export interface StringPreviewProps {
  characters: ColoredCharacter[];
}

export const StringPreview: FC<StringPreviewProps> = ({
  characters,
  ...props
}) => {
  return (
    <span css={styles.stringPreview} {...props}>
      {characters.map((character) => (
        <span key={character.uuid}>{character.character}</span>
      ))}
    </span>
  );
};

export default StringPreview;
