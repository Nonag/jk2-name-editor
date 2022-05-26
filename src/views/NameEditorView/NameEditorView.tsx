/** @jsxImportSource @emotion/react */
import type { FC } from 'react';
import { useState } from 'react';
import { ContentPaste as ClipboardIcon } from '@mui/icons-material';
import {
  Container,
  Grid,
  IconButton,
  SxProps,
  TableCell,
  TableRow,
  Theme,
  useTheme,
} from '@mui/material';

import type { ColoredCharacter } from 'src/types';
import { createColoredCharacters } from 'src/utils';
import ChatPreview from 'src/components/ChatPreview/ChatPreview';
import ClipboardDialog from 'src/components/ClipboardDialog/ClipboardDialog';
import NameEditor from 'src/components/NameEditor/NameEditor';
import ScoreBoard from 'src/components/ScoreBoard/ScoreBoard';

import makeStyles, { styles } from './NameEditorView.styles';

interface NameEditorViewProps {
  sx?: SxProps<Theme>;
}

export const NameEditorView: FC<NameEditorViewProps> = ({
  sx = [],
  ...props
}) => {
  const theme = useTheme();
  const cssStyles = makeStyles(theme);
  const initialCharacters = createColoredCharacters('Padawan');
  const [characters, setCharacters] =
    useState<ColoredCharacter[]>(initialCharacters);
  const [showClipboardDialog, setShowClipboardDialog] = useState(false);

  return (
    <Container
      maxWidth="md"
      sx={[styles.nameEditorView, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    >
      <img
        css={cssStyles.backgroundImg}
        alt="bespin_streets"
        src="/static/images/editor_background-02.jpg"
      />

      <Grid container sx={{ position: 'relative' }}>
        <Grid item xs={12}>
          <ScoreBoard sx={styles.scoreBoard}>
            <TableRow>
              <TableCell>
                <NameEditor
                  coloredCharacters={characters}
                  onUpdate={setCharacters}
                />
              </TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>
                <IconButton onClick={() => setShowClipboardDialog(true)}>
                  <ClipboardIcon sx={styles.clipboardIcon} />
                </IconButton>
              </TableCell>
            </TableRow>
          </ScoreBoard>
        </Grid>
      </Grid>

      <ChatPreview sx={styles.chat} characters={characters} />

      <ClipboardDialog
        coloredCharacters={characters}
        open={showClipboardDialog}
        onClose={() => setShowClipboardDialog(false)}
      />
    </Container>
  );
};

export default NameEditorView;
