import { Component, OnInit } from '@angular/core';
import {CheckersService, GamePlayStats} from '../game/checkers.service';

@Component({
  selector: 'app-gameplay-stats',
  templateUrl: './gameplay-stats.component.html',
  styleUrls: ['./gameplay-stats.component.css']
})
export class GameplayStatsComponent implements OnInit {

  public gamePlayStats: GamePlayStats[] = [];
  constructor(private checkerService: CheckersService) { }

  ngOnInit() {
    this.checkerService.fetchGamePlayStats().subscribe((result) => {
      result.forEach((gamePlayStat) => {
        this.gamePlayStats.push(gamePlayStat);
      });
    });
  }

}
