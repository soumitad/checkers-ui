// This will be a component that houses the actual checkers game board
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from './game.service';
import {CheckersService} from './checkers.service';
import {Space} from './space';
@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})
export class GameBoardComponent implements OnInit {
  public board: Space[][];
  // Observables
    public resetGame$: Observable<boolean>;
    constructor(private service: GameService,
                private checkersService: CheckersService
    ) {}
    ngOnInit() {
      /*this.board = this.service.board;*/
      this.checkersService.getCheckersBoard().subscribe((obj) => {
        console.log('Board ', obj);
        this.board = obj;
      });
    }
}
