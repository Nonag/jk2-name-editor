/** @jsxImportSource @emotion/react */
import type { InputHTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

import styles from './StringInput.styles';

export interface StringInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export const StringInput = forwardRef<HTMLInputElement, StringInputProps>(
  (props, ref) => (
    <input css={styles.stringInput} type="text" ref={ref} {...props} />
  ),
);

export default StringInput;
