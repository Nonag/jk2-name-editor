/** @jsxImportSource @emotion/react */
import type { FC } from 'react';
import { SerializedStyles } from '@emotion/react';

import type { ColoredCharacter } from 'src/types';
import { ColoredCharacter as Character } from 'src/components/ColoredCharacter/ColoredCharacter';

import cssStyles from './StringPreview.styles';

export interface StringPreviewProps {
  characters: ColoredCharacter[];
  css?: SerializedStyles | SerializedStyles[];
}

export const StringPreview: FC<StringPreviewProps> = ({
  characters,
  css,
  ...props
}) => {
  let previousCharacter: ColoredCharacter | undefined;

  return (
    <span css={[cssStyles.stringPreview, css]} {...props}>
      {characters.map((coloredCharacter) => {
        // If the current coloredCharacter was not touched and has no own colors,
        // use the previousCharacter's colors, if there is one.
        const previewCharacter: ColoredCharacter = {
          ...coloredCharacter,
          shadowHexColor:
            !!coloredCharacter.shadowHexColor || !previousCharacter
              ? coloredCharacter.shadowHexColor
              : previousCharacter.shadowHexColor,
          textHexColor:
            !!coloredCharacter.textHexColor || !previousCharacter
              ? coloredCharacter.textHexColor
              : previousCharacter.textHexColor,
        };

        previousCharacter = previewCharacter;

        return <Character key={coloredCharacter.uuid} {...previewCharacter} />;
      })}
    </span>
  );
};

export default StringPreview;
