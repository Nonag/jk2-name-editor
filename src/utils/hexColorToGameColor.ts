import chroma from 'chroma-js';

export interface LegacyColor {
  code: string;
  hex: string;
}

/* eslint-disable sort-keys-fix/sort-keys-fix */
export const legacyColors: Record<string, LegacyColor> = {
  black: { code: '0', hex: '000000' },
  red: { code: '1', hex: 'FF0000' },
  green: { code: '2', hex: '00FF00' },
  yellow: { code: '3', hex: 'FFFF00' },
  blue: { code: '4', hex: '0000FF' },
  cyan: { code: '5', hex: '00FFFF' },
  magenta: { code: '6', hex: 'FF00FF' },
  white: { code: '7', hex: 'FFFFFF' },
};
/* eslint-enable sort-keys-fix/sort-keys-fix */

/**
 * Hex color to jk2 in-game color code.
 *
 * @description Takes a hex color and returns it as a jk2 in-game color code.
 *
 * @example '#ee202060' => '^Yee202060'
 */
export const hexColorToGameColor = (
  hexColor: string,
  shortened = false,
  tolerance = 5,
) => {
  const hex = hexColor.replace('#', '');
  const hasAlpha = hex.length === 8;

  const hexShortened = hex.replace(/\w./g, (x: string) =>
    (((('0x' + x) as any) / 17 + 0.5) | 0).toString(16),
  );

  // Get legacy color codes for hex colors that are close enough to one of the legacy colors.
  const bestMatchingLegacyColor = Object.values(legacyColors).reduce(
    (bestMatchingLegacyColor: LegacyColor | undefined, legacyColor) => {
      const deltaE = chroma.deltaE(`#${legacyColor.hex}`, hexColor);

      const bestDeltaE = bestMatchingLegacyColor
        ? chroma.deltaE(`#${bestMatchingLegacyColor.hex}`, hexColor)
        : 100;

      if (bestDeltaE > tolerance && deltaE > tolerance) {
        return undefined;
      }

      if (bestDeltaE < deltaE) {
        return bestMatchingLegacyColor;
      }

      if (deltaE < bestDeltaE) {
        return legacyColor;
      }

      return bestMatchingLegacyColor;
    },

    undefined,
  );

  const legacyCode = bestMatchingLegacyColor?.code;

  if (shortened && (!hasAlpha || tolerance === 100) && !!legacyCode)
    return `^${legacyCode}`;

  if (shortened) return hasAlpha ? `^y${hexShortened}` : `^x${hexShortened}`;

  return hasAlpha ? `^Y${hex}` : `^X${hex}`;
};

export default hexColorToGameColor;
