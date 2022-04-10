/** @jsxImportSource @emotion/react */
import type { FC, HTMLAttributes } from 'react';
import React from 'react';
import type { SerializedStyles } from '@emotion/react';
import { css as emotionCss } from '@emotion/react/macro';

import type { ColoredCharacter as ColoredCharacterInterface } from 'src/types';

import styles from './ColoredCharacter.styles';

export interface ColoredCharacterProps
  extends ColoredCharacterInterface,
    HTMLAttributes<HTMLSpanElement> {
  css?: SerializedStyles | SerializedStyles[];
}

export const ColoredCharacter: FC<ColoredCharacterProps> = ({
  character,
  children,
  css,
  shadowRGBColor,
  shadowRGBString,
  textRGBColor,
  textRGBString,
  ...props
}) => {
  const characterColors = emotionCss({
    color: textRGBString,
    textShadow: shadowRGBString,
  });

  return (
    <span css={[styles.coloredCharacter, characterColors, css]} {...props}>
      {character || children}
    </span>
  );
};

export default ColoredCharacter;
