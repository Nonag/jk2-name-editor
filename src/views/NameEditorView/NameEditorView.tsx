/** @jsxImportSource @emotion/react */
import { type FC } from 'react';
import { Container, Grid, type SxProps, Theme, useTheme } from '@mui/material';

import ChatPreview from 'src/components/ChatPreview/ChatPreview';
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

  return (
    <Container
      maxWidth="md"
      sx={[styles.nameEditorView, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    >
      <img
        alt="bespin_streets"
        css={cssStyles.backgroundImg}
        src="/static/images/editor_background-01.jpg"
      />

      <Grid container sx={{ position: 'relative' }}>
        <Grid item xs={12}>
          <ScoreBoard sx={styles.scoreBoard} />
        </Grid>
      </Grid>

      <ChatPreview sx={styles.chat} />
    </Container>
  );
};

export default NameEditorView;
