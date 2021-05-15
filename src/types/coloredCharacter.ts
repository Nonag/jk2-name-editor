import { RGBColor } from 'react-color';

export interface ColoredCharacter {
  character: string;
  shadowRGBColor: RGBColor;
  shadowRGBString: string;
  textRGBColor: RGBColor;
  textRGBString: string;
  uuid: string;
}
