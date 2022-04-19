/** @jsxImportSource @emotion/react */
import type { FC } from 'react';
import { useState } from 'react';
import {
  Container,
  Grid,
  SxProps,
  TableCell,
  TableRow,
  Theme,
  useTheme,
} from '@mui/material';

import type { ColoredCharacter } from 'src/types';
import { createColoredCharacters } from 'src/utils';
import ChatPreview from 'src/components/ChatPreview/ChatPreview';
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
            </TableRow>
          </ScoreBoard>
        </Grid>
      </Grid>

      <ChatPreview sx={styles.chat} characters={characters} />
    </Container>
  );
};

export default NameEditorView;
