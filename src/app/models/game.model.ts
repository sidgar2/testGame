import {BlockStatus} from "../enums/game.enums";

export interface GameSettings {
  blocks: Block[];
  duration: number;
}

export interface Score {
  score: number;
  result: string;
}

export interface Block {
  id: number;
  status: BlockStatus;
}
