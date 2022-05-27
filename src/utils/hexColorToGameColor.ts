/**
 * Hex color to jk2 hex color code.
 *
 * @description Takes an RGBColor object and returns it as a jk2 in-game color code.
 *
 * @example '#ee202060' => '^Yee202060'
 */
export const hexColorToGameColor = (hexColor: string, shortened = false) => {
  const hex = hexColor.replace('#', '');
  const hexShortened = hex.replace(/\w./g, (x: string) =>
    (((('0x' + x) as any) / 17 + 0.5) | 0).toString(16),
  );

  if (shortened && hexShortened.length === 3) return `^x${hexShortened}`;
  if (shortened && hexShortened.length === 4) return `^y${hexShortened}`;
  if (hex.length === 6) return `^X${hex}`;
  if (hex.length === 8) return `^Y${hex}`;
};

export default hexColorToGameColor;
