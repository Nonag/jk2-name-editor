/** @jsxImportSource @emotion/react */
import type { FC, ReactNode } from 'react';
import {
  Box,
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

import { styles } from './ScoreBoard.styles';

export interface ScoreBoardProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export const ScoreBoard: FC<ScoreBoardProps> = ({
  children,
  sx = [],
  ...props
}) => {
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
            </TableRow>
          </TableHead>

          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ScoreBoard;
