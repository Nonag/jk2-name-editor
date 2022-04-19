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
  return (
    <span css={[cssStyles.stringPreview, css]} {...props}>
      {characters.map((character) => (
        <Character key={character.uuid} {...character} />
      ))}
    </span>
  );
};

export default StringPreview;
