/** @jsxImportSource @emotion/react */
import type { FC, ReactNode } from 'react';
import { SerializedStyles } from '@emotion/react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';

import makeStyles, { sx } from './ScoreBoard.styles';

export interface ScoreBoardProps {
  children: ReactNode;
  css?: SerializedStyles | SerializedStyles[];
}

export const ScoreBoard: FC<ScoreBoardProps> = ({
  children,
  css,
  ...props
}) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <TableContainer
      css={[styles.scoreBoard, css]}
      sx={sx.tableContainer}
      {...props}
    >
      <Typography sx={sx.tableHeading}>1st place (of 1) with 0</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell component="th">Name</TableCell>
            <TableCell component="th">Score</TableCell>
            <TableCell component="th">Ping</TableCell>
            <TableCell component="th">Time</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScoreBoard;
