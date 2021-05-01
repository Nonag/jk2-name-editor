/** @jsxImportSource @emotion/react */
import type { FC } from 'react';
import React from 'react';
import { SerializedStyles } from '@emotion/react';

import type { ColoredCharacter } from 'src/types';
import StringPreview from 'src/components/StringPreview/StringPreview';

import styles from './ChatPreview.styles';

export interface ChatPreviewProps {
  characters: ColoredCharacter[];
  css?: SerializedStyles;
}

export const ChatPreview: FC<ChatPreviewProps> = ({
  characters,
  css,
  ...props
}) => {
  return (
    <div css={[styles.chatPreview, css]} {...props}>
      <StringPreview characters={characters} />

      <span css={styles.colon}>: </span>
      <span css={styles.chatMessage}>I have a bad feeling about this.</span>
    </div>
  );
};

export default ChatPreview;
