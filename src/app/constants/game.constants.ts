import {BlockStatus} from "../enums/game.enums";

export const BLOCKS_GRID_SIZE = 10;

export const INITIAL_RESULT = {score: 0, result: "0-0"};

export const BLOCK_CLASSES = {
  [BlockStatus.Pending]: 'pending',
  [BlockStatus.Win]: 'win',
  [BlockStatus.Lose]: 'lose',
  [BlockStatus.Current]: 'current'
}
