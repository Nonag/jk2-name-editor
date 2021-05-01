/** @jsxImportSource @emotion/react */
import type { FC, HTMLAttributes } from 'react';
import React from 'react';
import type { SerializedStyles } from '@emotion/react';

import styles from './ColoredCharacter.styles';

export interface ColoredCharacterProps extends HTMLAttributes<HTMLSpanElement> {
  css?: SerializedStyles | SerializedStyles[];
}

export const ColoredCharacter: FC<ColoredCharacterProps> = ({
  children,
  css,
  ...props
}) => (
  <span css={[styles.coloredCharacter, css]} {...props}>
    {children}
  </span>
);

export default ColoredCharacter;
