import {Component, Input} from '@angular/core';
import {GameResult} from "../../enums/game.enums";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  constructor(private gameService: GameService) { }

  @Input() set result(res: GameResult | null) {
    this.message = this.getMessage(res);
  }

  duration: number | undefined;

  message = '';

  getMessage(result: GameResult | null): string {
    const gameResult = this.gameService.currentResult.getValue().result;
    return result === GameResult.Win ? `You won! Your result: ${gameResult}` :
      result === GameResult.Lose ? `You lost! Your result: ${gameResult}` : '';
  }

  OnClick(): void {
    this.gameService.startGame(this.duration || 0);
  }
  get isButtonValid(): boolean {
    return !!this.duration && this.duration >= 10;
  }
}
