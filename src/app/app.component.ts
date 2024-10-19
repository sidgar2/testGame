import {Component, OnInit} from '@angular/core';
import {GameService} from "./services/game.service";
import {GameSettings} from "./models/game.model";
import {GameResult} from "./enums/game.enums";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private gameService: GameService) {
  }

  gameSettings: GameSettings | null = null;
  gameResult: GameResult | null = null;

  ngOnInit() {
    // this.gameService.startGame(1000);

    this.gameService.gameSettings.subscribe((settings: GameSettings | null) => {
      this.gameSettings = settings;
    })

    this.gameService.gameResult.subscribe((result: GameResult | null) => {
      this.gameResult = result;
    });
  }

  get isModalOpen(): boolean {
    return !this.gameSettings || this.gameResult !== null;
  }
}
