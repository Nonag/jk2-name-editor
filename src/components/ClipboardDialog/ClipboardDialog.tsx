/** @jsxImportSource @emotion/react */
import type { FC } from 'react';
import type { DialogProps, Theme } from '@mui/material';
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';

import type { ColoredCharacter } from 'src/types';
import { hexColorToGameColor } from 'src/utils';

import { styles } from './ClipboardDialog.styles';

export interface ClipboardDialogProps extends DialogProps {
  coloredCharacters: ColoredCharacter[];
}

export const ClipboardDialog: FC<ClipboardDialogProps> = ({
  coloredCharacters,
  sx = [],
  ...props
}) => {
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

          <Typography component="pre" sx={styles.pre}>
            <Typography component="code" sx={styles.code}>
              {coloredCharacters.map(
                (coloredCharacter) =>
                  `${hexColorToGameColor(coloredCharacter.textHexColor)}${
                    coloredCharacter.character
                  }`,
              )}
            </Typography>
          </Typography>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default ClipboardDialog;
