/** @jsxImportSource @emotion/react */
import type { FC } from 'react';
import { SerializedStyles } from '@emotion/react';
import { Box, useTheme } from '@mui/material';

import type { ColoredCharacter } from 'src/types';
import StringPreview from 'src/components/StringPreview/StringPreview';

import makeStyles from './ChatPreview.styles';

export interface ChatPreviewProps {
  characters: ColoredCharacter[];
  css?: SerializedStyles | SerializedStyles[];
}

export const ChatPreview: FC<ChatPreviewProps> = ({
  characters,
  css,
  ...props
}) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <Box css={[styles.chatPreview, css]} {...props}>
      <StringPreview characters={characters} />

      <span css={styles.colon}>: </span>
      <span css={styles.chatMessage}>I have a bad feeling about this.</span>
    </Box>
  );
};

export default ChatPreview;
