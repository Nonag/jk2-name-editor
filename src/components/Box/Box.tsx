/** @jsxImportSource @emotion/react */
import type { FC, ReactNode } from 'react';
import React from 'react';
import { SerializedStyles } from '@emotion/react';

import styles from './Box.styles';

export interface BoxProps {
  border?: boolean;
  children: ReactNode;
  css?: SerializedStyles;
}

export const Box: FC<BoxProps> = ({
  border = true,
  children,
  css,
  ...props
}) => {
  return (
    <div css={[styles.box, border && styles.border, css]} {...props}>
      {children}
    </div>
  );
};

export default Box;
