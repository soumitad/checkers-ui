import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { GameService } from './game.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'game-console',
  templateUrl: './game-console.component.html',
  styleUrls: ['./game-console.component.css'],
})
export class GameConsoleComponent implements OnInit {
  public turn: string = null;

  // Observables
  public redTurn$: Observable<boolean>;

  // Behavior Subjects
  // tslint:disable-next-line:variable-name
  public _resetGame: BehaviorSubject<boolean>;

  constructor(
    private service: GameService
  ) {
  }

  ngOnInit() {
    this.redTurn$ = this.service.redTurnObs;
    this.redTurn$.subscribe(redTurn => {
      this.turn = redTurn ? 'Red' : 'Black';
    });

    // Behavior Subjects
    this._resetGame = this.service.resetGameBeh;
    this._resetGame.subscribe(reset => {
      this.turn = 'Red'; // When the game is reset by someone else set the turn to Red
    });
  }

}
