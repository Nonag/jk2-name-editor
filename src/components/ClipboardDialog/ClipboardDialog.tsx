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

import type { ColoredCharacter } from 'src/types';
import { defaultShadowHexColor, hexColorToGameColor } from 'src/utils';

import { styles } from './ClipboardDialog.styles';

/**
 * Transforms the provided `ColoredCharacter` to a string that is encoded with the in-game color codes.
 *
 * The game needs three color codes in front of a character to override the shadow color. The first color code is
 * not used however. Hence the `^0` that is arbitrary added to the encoded shadow color.
 */
const getColorCodedCharacter = (
  coloredCharacter: ColoredCharacter,
  shortened = false,
) => {
  const { character, shadowHexColor, textHexColor, touched } = coloredCharacter;
  const hasShadow = shadowHexColor !== defaultShadowHexColor;
  const encodedTextColor = hexColorToGameColor(textHexColor, shortened);
  const encodedShadowColor = hasShadow
    ? `^0${hexColorToGameColor(shadowHexColor, shortened)}`
    : '';
  const encodedColors = touched ? encodedShadowColor + encodedTextColor : '';

  return encodedColors + character;
};

export interface ClipboardDialogProps extends DialogProps {
  coloredCharacters: ColoredCharacter[];
}

export const ClipboardDialog: FC<ClipboardDialogProps> = ({
  coloredCharacters,
  sx = [],
  ...props
}) => {
  const [showNotice, setShowNotice] = useState(false);

  const colorCodedPlayerName = coloredCharacters
    .map((coloredCharacter) => getColorCodedCharacter(coloredCharacter))
    .join('');

  const colorCodedPlayerNameShortened = coloredCharacters
    .map((coloredCharacter) => getColorCodedCharacter(coloredCharacter, true))
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
