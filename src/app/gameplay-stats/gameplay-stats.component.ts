import { Component, OnInit } from '@angular/core';
import {CheckersService} from '../game/checkers.service';

@Component({
  selector: 'app-gameplay-stats',
  templateUrl: './gameplay-stats.component.html',
  styleUrls: ['./gameplay-stats.component.css']
})
export class GameplayStatsComponent implements OnInit {

  constructor(private checkerService: CheckersService) { }

  ngOnInit() {
  }

}
