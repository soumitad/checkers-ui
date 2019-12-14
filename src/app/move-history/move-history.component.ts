import { Component, OnInit } from '@angular/core';
import {CheckersService, GameHistory} from '../game/checkers.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-move-history',
  templateUrl: './move-history.component.html',
  styleUrls: ['./move-history.component.css']
})
export class MoveHistoryComponent implements OnInit {

  public moveHistory: GameHistory[];
  private gameId: string;
  constructor(private checkerService: CheckersService,
              private route: ActivatedRoute) {
    this.gameId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.checkerService.fetchGameHistory(this.gameId).subscribe((result) => {
      this.moveHistory = result;
    });
  }

}
