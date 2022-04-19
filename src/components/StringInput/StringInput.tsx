/** @jsxImportSource @emotion/react */
import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import cssStyles from './StringInput.styles';

export interface StringInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export const StringInput = forwardRef<HTMLInputElement, StringInputProps>(
  (props, ref) => (
    <input css={cssStyles.stringInput} type="text" ref={ref} {...props} />
  ),
);

export default StringInput;
