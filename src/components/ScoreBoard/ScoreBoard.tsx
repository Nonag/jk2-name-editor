/** @jsxImportSource @emotion/react */
import { type FC, useEffect, useState } from 'react';
import { ContentPaste as ClipboardIcon } from '@mui/icons-material';
import {
  Box,
  IconButton,
  type SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  type Theme,
  Typography,
} from '@mui/material';

import { type PlayerName } from 'src/types';
import { api } from 'src/services/api';
import { usePlayerName } from 'src/services/state';
import ClipboardDialog from 'src/components/ClipboardDialog/ClipboardDialog';
import NameEditor from 'src/components/NameEditor/NameEditor';
import StringPreview from 'src/components/StringPreview/StringPreview';

import { styles } from './ScoreBoard.styles';

export interface ScoreBoardProps {
  sx?: SxProps<Theme>;
}

export const ScoreBoard: FC<ScoreBoardProps> = ({ sx = [], ...props }) => {
  const [showClipboardDialog, setShowClipboardDialog] = useState(false);
  const [playerNames, setPlayerNames] = useState<PlayerName[]>([]);
  const { playerName } = usePlayerName();

  /**
   * Open the clip board dialog and send the player name to the server.
   */
  const handleOpenClipboardDialog = () => {
    api
      .playerNameCreate(playerName)
      .catch((error) => console.warn('Player name was not submitted.'));

    setShowClipboardDialog(true);
  };

  // Fetch player names on mount.
  useEffect(() => {
    api
      .playerNameList()
      .then((playerNameList) => setPlayerNames(playerNameList))
      .catch((error) => console.warn('Could not fetch player names.'));
  }, []);

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

            {!!playerNames.length &&
              playerNames.map((playerName, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <StringPreview characters={playerName.coloredCharacters} />
                  </TableCell>

                  <TableCell>0</TableCell>

                  <TableCell>0</TableCell>

                  <TableCell>0</TableCell>

                  <TableCell></TableCell>
                </TableRow>
              ))}
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
