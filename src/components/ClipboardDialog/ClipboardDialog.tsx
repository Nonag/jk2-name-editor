/** @jsxImportSource @emotion/react */
import type { FC, MouseEvent } from 'react';
import { useState } from 'react';
import { ContentCopy as CopyIcon } from '@mui/icons-material';
import type { DialogProps } from '@mui/material';
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  Typography,
} from '@mui/material';

import { getColorCodedCharacter } from 'src/utils';
import { usePlayerName } from 'src/services/state';

import { styles } from './ClipboardDialog.styles';

export interface ClipboardDialogProps extends DialogProps {}

export const ClipboardDialog: FC<ClipboardDialogProps> = ({
  sx = [],
  ...props
}) => {
  const [showNotice, setShowNotice] = useState(false);
  const { playerName } = usePlayerName();

  const colorCodedPlayerName = playerName.coloredCharacters
    .map((coloredCharacter) => getColorCodedCharacter(coloredCharacter))
    .join('');

  const colorCodedPlayerNameShortened = playerName.coloredCharacters
    .map((coloredCharacter) => getColorCodedCharacter(coloredCharacter, true))
    .join('');

  const colorCodedPlayerNameLegacy = playerName.coloredCharacters
    .map((coloredCharacter) =>
      getColorCodedCharacter(coloredCharacter, true, 100),
    )
    .join('');

  /**
   * Copy name to clipboard and show notice.
   */
  const handleCopyToClipboard =
    (colorCodedName: string) => (event: MouseEvent) => {
      setShowNotice(true);
      navigator.clipboard.writeText(colorCodedName);
    };

  return (
    <Dialog {...props}>
      <Box sx={[styles.ClipboardDialog, ...(Array.isArray(sx) ? sx : [sx])]}>
        <DialogTitle
          className="ClipboardDialog-title"
          textTransform="uppercase"
        >
          Copy your name to clipboard
        </DialogTitle>

        <DialogContent>
          <DialogContentText paragraph>
            Click the icon next to the string to copy the name to your clipboard
          </DialogContentText>

          <DialogContentText variant="body2">
            Precise hex codes {colorCodedPlayerName.length} / 36
          </DialogContentText>

          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Typography component="pre" sx={styles.pre}>
              <Typography component="code" sx={styles.code}>
                {colorCodedPlayerName}
              </Typography>
            </Typography>

            <IconButton onClick={handleCopyToClipboard(colorCodedPlayerName)}>
              <CopyIcon />
            </IconButton>
          </Box>

          <DialogContentText variant="body2">
            Shortened hex codes {colorCodedPlayerNameShortened.length} / 36
          </DialogContentText>

          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Typography component="pre" sx={styles.pre}>
              <Typography component="code" sx={styles.code}>
                {colorCodedPlayerNameShortened}
              </Typography>
            </Typography>

            <IconButton
              onClick={handleCopyToClipboard(colorCodedPlayerNameShortened)}
            >
              <CopyIcon />
            </IconButton>
          </Box>

          <DialogContentText variant="body2">
            Closest legacy codes {colorCodedPlayerNameLegacy.length} / 36
          </DialogContentText>

          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Typography component="pre" sx={styles.pre}>
              <Typography component="code" sx={styles.code}>
                {colorCodedPlayerNameLegacy}
              </Typography>
            </Typography>

            <IconButton
              onClick={handleCopyToClipboard(colorCodedPlayerNameLegacy)}
            >
              <CopyIcon />
            </IconButton>
          </Box>
        </DialogContent>
      </Box>

      <Snackbar
        open={showNotice}
        onClose={() => setShowNotice(false)}
        autoHideDuration={2000}
        message="Copied to clipboard"
      />
    </Dialog>
  );
};

export default ClipboardDialog;
