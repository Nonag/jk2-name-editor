import { type PlayerName } from 'src/types';

import axi from './setup';
import { urls } from './urls';

export interface PlayerNameCreateRequestProps extends PlayerName {}
/**
 * @description Creates an entry with the provided player name and colored characters.
 */
export const playerNameCreate = async (
  requestProps: PlayerNameCreateRequestProps,
) => {
  const { coloredCharacters, name, ...params } = requestProps;
  const requestUrl = urls.playerNameCreate();

  await axi.post(requestUrl, { coloredCharacters, name }, { params });
};

export interface PlayerNameListRequestProps {}
/**
 * @description Get a limited list of random player names.
 */
export const playerNameList = async (
  requestProps?: PlayerNameListRequestProps,
) => {
  const { ...params } = requestProps || {};
  const requestUrl = urls.playerNameList();

  const { data: playerNames } = await axi.get<PlayerName[]>(requestUrl, {
    params,
  });

  return playerNames;
};
