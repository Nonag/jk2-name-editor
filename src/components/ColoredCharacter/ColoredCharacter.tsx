/** @jsxImportSource @emotion/react */
import { type FC, type HTMLAttributes } from 'react';
import { type SerializedStyles } from '@emotion/react';
import { useTheme } from '@mui/material';

import { type ColoredCharacter as ColoredCharacterInterface } from 'src/types';

import makeStyles from './ColoredCharacter.styles';

export interface ColoredCharacterProps
  extends ColoredCharacterInterface,
    HTMLAttributes<HTMLSpanElement> {
  css?: SerializedStyles | SerializedStyles[];
}

export const ColoredCharacter: FC<ColoredCharacterProps> = ({
  character,
  children,
  css,
  shadowHexColor,
  textHexColor,
  ...props
}) => {
  const theme = useTheme();
  const cssStyles = makeStyles(theme, { shadowHexColor, textHexColor });

  return (
    <span css={[cssStyles.coloredCharacter, css]} {...props}>
      {children || character}
    </span>
  );
};

export default ColoredCharacter;
