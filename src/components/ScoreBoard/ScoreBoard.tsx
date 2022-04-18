/** @jsxImportSource @emotion/react */
import type { FC, ReactNode } from 'react';
import { SerializedStyles } from '@emotion/react';
import { useTheme } from '@mui/material';

import makeStyles from './ScoreBoard.styles';

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
    <table css={[styles.scoreBoard, css]} {...props}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
          <th>Ping</th>
          <th>Time</th>
        </tr>
      </thead>

      <tbody>{children}</tbody>
    </table>
  );
};

export default ScoreBoard;
