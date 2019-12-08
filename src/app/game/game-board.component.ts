// This will be a component that houses the actual checkers game board
import {Component, Input} from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from './game.service';
import {CheckersService} from './checkers.service';
@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})
export class GameBoardComponent implements OnInit {
  public board: any;
  @Input() public gameId: string;
  // Observables
    public resetGame$: Observable<boolean>;
    constructor(private service: GameService,
                private checkerService: CheckersService
    ) {}
    ngOnInit() {
      /* this.board = this.service.board; */
      this.checkerService.getCheckersBoard(this.gameId).subscribe((result) => {
        this.board = result.gameBoard;
        this.checkerService.board = this.board;
        console.log('Board ', this.checkerService.board);
      });
    }
}
