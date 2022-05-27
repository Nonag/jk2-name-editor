import { v4 as uuid } from 'uuid';

import type { ColoredCharacter } from 'src/types';

export const defaultTextHexColor = '#ffffff';
export const defaultShadowHexColor = '#606060';

/**
 * Create colored Characters
 *
 * @description Takes any string and returns an array with ColoredCharacter for each character in that string.
 */
export const createColoredCharacters = (
  characterString: string,
): ColoredCharacter[] =>
  [...characterString].map((character) => ({
    character,
    shadowHexColor: defaultShadowHexColor,
    textHexColor: defaultTextHexColor,
    uuid: uuid(),
  }));

export default createColoredCharacters;
