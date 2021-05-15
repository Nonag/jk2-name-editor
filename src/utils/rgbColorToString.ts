import { RGBColor } from 'react-color';

/**
 * @description Takes an RGBColor object and returns it as a CSS rgb color property string.
 *
 * @example { a: 1, b: 255, g: 155, r: 055 } => 'rgba(055, 255, 155, 1)'
 */
const rgbColorToString = (rgbColor: RGBColor) =>
  `rgba(${rgbColor.r},${rgbColor.g},${rgbColor.b},${rgbColor.a ?? 1})`;

export default rgbColorToString;
