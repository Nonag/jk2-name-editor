/** @jsxImportSource @emotion/react */
import type { FC, ReactNode } from 'react';
import React from 'react';
import { SerializedStyles } from '@emotion/react';

import styles from './ScoreBoard.styles';

export interface ScoreBoardProps {
  children: ReactNode;
  css?: SerializedStyles | SerializedStyles[];
}

export const ScoreBoard: FC<ScoreBoardProps> = ({
  children,
  css,
  ...props
}) => {
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
