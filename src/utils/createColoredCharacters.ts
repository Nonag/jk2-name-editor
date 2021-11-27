import { v4 as uuid } from 'uuid';

import type { ColoredCharacter } from 'src/types';
import { rgbColorToString } from 'src/utils';

export const defaultTextRGBColor = { a: 1, b: 255, g: 255, r: 255 };
export const defaultShadowRGBColor = { a: 1, b: 96, g: 96, r: 96 };

/**
 * Create colored Characters
 *
 * @description Takes any string and returns an array with ColoredCharacter for each character in that string.
 */
// Takes any string and returns an array with ColoredCharacter for each character in that string.
const createColoredCharacters = (characterString: string): ColoredCharacter[] =>
  [...characterString].map((character) => ({
    character,
    shadowRGBColor: defaultShadowRGBColor,
    shadowRGBString: rgbColorToString(defaultShadowRGBColor),
    textRGBColor: defaultTextRGBColor,
    textRGBString: rgbColorToString(defaultTextRGBColor),
    uuid: uuid(),
  }));

export default createColoredCharacters;
