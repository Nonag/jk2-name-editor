/** @jsxImportSource @emotion/react */
import { type FC } from 'react';
import { Box, type BoxProps, useTheme } from '@mui/material';

import { usePlayerName } from 'src/services/state';
import StringPreview from 'src/components/StringPreview/StringPreview';

import makeStyles from './ChatPreview.styles';

export interface ChatPreviewProps extends BoxProps {}

/**
 * A mocked chat which displays a single message sent by the player whose name is currently edited.
 */
export const ChatPreview: FC<ChatPreviewProps> = ({ ...props }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { playerName } = usePlayerName();

  return (
    <Box css={styles.chatPreview(theme)} {...props}>
      <StringPreview characters={playerName.coloredCharacters} />

      <span css={styles.colon}>: </span>
      <span css={styles.chatMessage}>I have a bad feeling about this.</span>
    </Box>
  );
};

export default ChatPreview;
