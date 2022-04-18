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

import makeStyles from './NameEditorView.styles';

interface NameEditorViewProps {
  sx?: SxProps<Theme>;
}

export const NameEditorView: FC<NameEditorViewProps> = ({
  sx = [],
  ...props
}) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const initialCharacters = createColoredCharacters('Padawan');
  const [characters, setCharacters] =
    useState<ColoredCharacter[]>(initialCharacters);

  return (
    <Container
      maxWidth="md"
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    >
      <img
        css={styles.backgroundImg}
        alt="bespin_streets"
        src="/static/images/editor_background.jpg"
      />

      <Grid container sx={{ position: 'relative' }}>
        <Grid item xs={12}>
          <ScoreBoard>
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

      <ChatPreview css={styles.chat} characters={characters} />
    </Container>
  );
};

export default NameEditorView;
