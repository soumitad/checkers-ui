import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Space } from './space';
import { GameService } from './game.service';
import {CheckersService} from './checkers.service';
import {AuthenticationService} from '../_services';
import {User} from '../register/register.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.css'],
})
export class SpaceComponent {
  @Input() space: Space;
  @Input() disabled: boolean;
  @Input() loggedInUserColor: string;
  @Input() gameId: string;
  @Output() public currentTurn = new EventEmitter();
  public loggedInUser: User;
  public currentPlayerColor: string;
  constructor(
    private service: GameService,
    private checkerService: CheckersService,
    private authService: AuthenticationService
  ) {}
  performMove(space: Space): void {
    console.log('Space Highlight ', space);
    if (!this.checkerService.winner) {
      if (!this.checkerService.disabled &&
          this.checkerService.selectedSpace.piece.color === this.loggedInUserColor &&
          this.space.highlight) {
        this.checkerService.performMove(space, this.gameId);
      }
    }
  }
  fetchLegalMoves(space: Space): void {
    console.log('Clicked Piece', space);
    if (!this.checkerService.winner) {
      if (!this.checkerService.disabled && this.space.piece.color === this.loggedInUserColor) {
        this.checkerService.fetchLegalMoves(space, this.gameId);
      }
    }
  }
}
