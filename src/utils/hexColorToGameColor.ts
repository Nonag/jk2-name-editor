/**
 * Hex color to jk2 hex color code.
 *
 * @description Takes an RGBColor object and returns it as a jk2 in-game color code.
 *
 * @example '#ee202060' => '^Yee202060'
 */
export const hexColorToGameColor = (hexColor: string) => {
  console.log(hexColor.length)
  if (hexColor.length === 7) return hexColor.replace('#', '^X');
  if (hexColor.length === 9) return hexColor.replace('#', '^Y');
};

export default hexColorToGameColor;
