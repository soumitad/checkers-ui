// This will be a component that houses the actual checkers game board
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from './game.service';
@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})
export class GameBoardComponent implements OnInit {
  public board: any;
  // Observables
    public resetGame$: Observable<boolean>;
    constructor(private service: GameService
    ) {}
    ngOnInit() {
      this.board = this.service.board;
      console.log('Board ', this.board);
    }
}
