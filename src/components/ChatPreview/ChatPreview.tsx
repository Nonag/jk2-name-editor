/** @jsxImportSource @emotion/react */
import type { FC } from 'react';
import { Box, SxProps, Theme, useTheme } from '@mui/material';

import { usePlayerName } from 'src/services/state';
import StringPreview from 'src/components/StringPreview/StringPreview';

import makeStyles, { styles } from './ChatPreview.styles';

export interface ChatPreviewProps {
  sx?: SxProps<Theme>;
}

export const ChatPreview: FC<ChatPreviewProps> = ({ sx = [], ...props }) => {
  const theme = useTheme();
  const cssStyles = makeStyles(theme);
  const { playerName } = usePlayerName();

  return (
    <Box
      sx={[styles.chatPreview, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    >
      <StringPreview characters={playerName.coloredCharacters} />

      <span css={cssStyles.colon}>: </span>
      <span css={cssStyles.chatMessage}>I have a bad feeling about this.</span>
    </Box>
  );
};

export default ChatPreview;
