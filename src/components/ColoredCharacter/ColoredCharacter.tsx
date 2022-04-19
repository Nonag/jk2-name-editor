/** @jsxImportSource @emotion/react */
import type { FC, HTMLAttributes } from 'react';
import type { SerializedStyles } from '@emotion/react';
import { css as emotionCss } from '@emotion/react';
import { useTheme } from '@mui/material';

import type { ColoredCharacter as ColoredCharacterInterface } from 'src/types';

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
  shadowRGBColor,
  shadowRGBString,
  textRGBColor,
  textRGBString,
  ...props
}) => {
  const theme = useTheme();
  const cssStyles = makeStyles(theme);
  const characterColors = emotionCss({
    color: textRGBString,
    textShadow: shadowRGBString,
  });

  return (
    <span css={[cssStyles.coloredCharacter, characterColors, css]} {...props}>
      {character || children}
    </span>
  );
};

export default ColoredCharacter;
