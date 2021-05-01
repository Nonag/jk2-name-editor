/** @jsxImportSource @emotion/react */
import type { FC, InputHTMLAttributes } from 'react';
import React from 'react';

import styles from './StringInput.styles';

export interface StringInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export const StringInput: FC<StringInputProps> = ({ ...props }) => {
  return <input css={styles.stringInput} type="text" {...props} />;
};

export default StringInput;
