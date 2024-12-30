import {
  createContext,
  type FC,
  type ReactNode,
  useContext,
  useState,
} from 'react';

import { type PlayerName } from 'src/types';
import { createColoredCharacters } from 'src/utils';

export interface PlayerNameContextValue {
  playerName: PlayerName;
  setPlayerName: (playerName: PlayerName) => void;
}

interface SettingsProviderProps {
  children?: ReactNode;
}

const defaultPlayerName: PlayerName = {
  coloredCharacters: createColoredCharacters('Padawan'),
  name: 'Padawan',
};

const PlayerNameContext = createContext<PlayerNameContextValue>({
  playerName: defaultPlayerName,
  setPlayerName: () => {},
});

export const usePlayerName = () => useContext(PlayerNameContext);

export const PlayerNameProvider: FC<SettingsProviderProps> = ({ children }) => {
  const [playerName, setPlayerName] = useState<PlayerName>(defaultPlayerName);

  return (
    <PlayerNameContext.Provider
      value={{
        playerName,
        setPlayerName,
      }}
    >
      {children}
    </PlayerNameContext.Provider>
  );
};
