/** @jsxImportSource @emotion/react */
import type { FC } from 'react';
import { useState } from 'react';
import { ContentPaste as ClipboardIcon } from '@mui/icons-material';
import {
  Box,
  IconButton,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
} from '@mui/material';

import { usePlayerName } from 'src/services/state';
import ClipboardDialog from 'src/components/ClipboardDialog/ClipboardDialog';
import NameEditor from 'src/components/NameEditor/NameEditor';

import { styles } from './ScoreBoard.styles';

export interface ScoreBoardProps {
  sx?: SxProps<Theme>;
}

export const ScoreBoard: FC<ScoreBoardProps> = ({ sx = [], ...props }) => {
  const [showClipboardDialog, setShowClipboardDialog] = useState(false);
  const { playerName } = usePlayerName();

  /**
   * Open the clip board dialog and send the player name to the server.
   */
  const handleOpenClipboardDialog = () => {
    const requestOptions = {
      body: JSON.stringify({ playerName: playerName.name }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    };

    fetch(process.env.REACT_APP_POST_PLAYER_NAME!, requestOptions).catch(() =>
      console.warn('Player name was not submitted.'),
    );

    setShowClipboardDialog(true);
  };

  return (
    <Box
      sx={[styles.scoreBoard, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    >
      <Typography className="ScoreBoard-heading" sx={styles.heading}>
        1st place (of 1) with 0
      </Typography>

      <TableContainer sx={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell component="th">Name</TableCell>

              <TableCell component="th">Score</TableCell>

              <TableCell component="th">Ping</TableCell>

              <TableCell component="th">Time</TableCell>

              <TableCell component="th">Clipboard</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>
                <NameEditor />
              </TableCell>

              <TableCell>0</TableCell>

              <TableCell>0</TableCell>

              <TableCell>0</TableCell>

              <TableCell sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={handleOpenClipboardDialog}>
                  <ClipboardIcon sx={styles.clipboardIcon} />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <ClipboardDialog
        open={showClipboardDialog}
        onClose={() => setShowClipboardDialog(false)}
      />
    </Box>
  );
};

export default ScoreBoard;
