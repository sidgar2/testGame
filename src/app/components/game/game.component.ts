import {Component, OnInit} from '@angular/core';
import {GameService} from "../../services/game.service";
import {Block, GameSettings} from "../../models/game.model";
import {GameHelper} from "../../services/game.helper";
import {BlockStatus} from "../../enums/game.enums";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  constructor(private gameService: GameService) {
  }

  blocks: Block[] = [];
  duration: number = 0;
  playingId: number | null = null;
  winsCount: number = 0;
  losesCount: number = 0;

  gameInterval: number = 0;

  usedBlocks: number[] = [];

  ngOnInit() {
    this.gameService.gameSettings.subscribe((gameSettings: GameSettings | null) => {
      this.blocks = gameSettings?.blocks || [];
      this.duration = gameSettings?.duration || 0;
      this.winsCount = 0;
      this.losesCount = 0;

      if (gameSettings) {
        this.startRound();
      }
    });
  }

  startRound(): void {
    this.selectRandomBlock();

    this.gameInterval = setTimeout(() => {
      this.endRound()
    }, this.duration);
  }

  selectRandomBlock(): void {
    const blocksCount = this.blocks.length;
    this.playingId = this.getRandomIndex(blocksCount - 1);
    this.usedBlocks.push(this.playingId);
    this.changeCurrentBlockStatus(BlockStatus.Current);
  }

  getRandomIndex(count: number): number {
    const randomIndex = GameHelper.getRandomNumber(0, count);

    if (this.usedBlocks.includes(randomIndex)) {
      return this.getRandomIndex(count);
    }

    return randomIndex;
  }

  changeCurrentBlockStatus(status: BlockStatus): void {
    if (this.playingId || this.playingId === 0) {}
    this.blocks[this.playingId as number].status = status;
  }

  endRound(isWin = false) {
    clearTimeout(this.gameInterval);

    if (isWin) {
      this.changeCurrentBlockStatus(BlockStatus.Win);
      this.winsCount++;
    } else {
      this.changeCurrentBlockStatus(BlockStatus.Lose);
      this.losesCount++;
    }

    const isEndOfGame = this.gameService.endRound(this.winsCount, this.losesCount);

    if (!isEndOfGame) {
      this.startRound();
    }
  }
}
