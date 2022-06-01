import type { ColoredCharacter } from 'src/types';
import { hexColorToGameColor } from 'src/utils';

/**
 * Transforms the provided `ColoredCharacter` to a string that is encoded with the in-game color codes.
 *
 * The game needs three color codes in front of a character to override the shadow color. The first color code is
 * not used however. Hence the `^0` that is arbitrary added to the encoded shadow color.
 */
export const getColorCodedCharacter = (
  coloredCharacter: ColoredCharacter,
  shortened = false,
) => {
  const { character, shadowHexColor, textHexColor } = coloredCharacter;
  const encodedTextColor = !!textHexColor
    ? hexColorToGameColor(textHexColor, shortened)
    : '';
  const encodedShadowColor = !!shadowHexColor
    ? `^0${hexColorToGameColor(shadowHexColor, shortened)}`
    : '';
  const encodedColors = encodedShadowColor + encodedTextColor;

  return encodedColors + character;
};

export default getColorCodedCharacter;
