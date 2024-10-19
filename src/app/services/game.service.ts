import {BehaviorSubject} from "rxjs";
import {Block, GameSettings, Score} from "../models/game.model";
import {BlockStatus, GameResult} from "../enums/game.enums";
import {BLOCKS_GRID_SIZE, INITIAL_RESULT} from "../constants/game.constants";

export class GameService {
  public gameSettings: BehaviorSubject<GameSettings | null> = new BehaviorSubject<GameSettings | null>(null);
  private _topScore: Score = localStorage.getItem("topScore")? JSON.parse(localStorage.getItem("topScore")!) : INITIAL_RESULT;
  public topScore: BehaviorSubject<Score> = new BehaviorSubject<Score>(this._topScore);
  public currentResult: BehaviorSubject<Score> = new BehaviorSubject<Score>(INITIAL_RESULT);
  public gameResult: BehaviorSubject<GameResult | null> = new BehaviorSubject<GameResult | null>(null);

  private generateBlocks(): Block[] {
    return new Array(BLOCKS_GRID_SIZE * BLOCKS_GRID_SIZE).fill(0).map((_, index) => ({id: index + 1, status: BlockStatus.Pending}));
  }

  public startGame(duration: number): void {
    this.gameResult.next(null);
    this.currentResult.next(INITIAL_RESULT);

    const gameSettings: GameSettings = {
      blocks: this.generateBlocks(),
      duration
    };

    console.log(gameSettings);
    this.gameSettings.next(gameSettings);
  }

  public endRound(user: number, computer: number): boolean {
    this.currentResult.next({score: user - computer, result: `${user}-${computer}`});

    if (user === BLOCKS_GRID_SIZE || computer === BLOCKS_GRID_SIZE) {
      this.endGame(user, computer);
      return true;
    }
      return false;
  }

  public endGame(user: number, computer: number): void {
    const topScore = this.topScore.getValue();
    this.gameResult.next(user > computer? GameResult.Win : GameResult.Lose);

    if ((user - computer) > topScore.score) {
      topScore.score = user - computer;
      topScore.result = `${user}-${computer}`;

      localStorage.setItem("topScore", JSON.stringify(topScore));

      this.topScore.next(topScore);
    }
  }
}
