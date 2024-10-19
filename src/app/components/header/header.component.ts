import {Component, OnInit} from '@angular/core';
import {GameService} from "../../services/game.service";
import {GameSettings, Score} from "../../models/game.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private gameService: GameService) {
  }

  topScore = '';
  currentResult = '';
  duration = 0;
  ngOnInit() {
    this.gameService.topScore.subscribe((topScore: Score) => this.topScore = topScore.result)

    this.gameService.currentResult.subscribe((currentResult: Score) => this.currentResult = currentResult.result);

    this.gameService.gameSettings.subscribe((gameSettings: GameSettings | null) => {
      if (gameSettings) {
        this.duration = gameSettings.duration;
      }
    });
  }
}
