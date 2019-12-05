import { Component, Input }	from '@angular/core';
import { Space } from './space';
import { GameService } from './game.service';
import {CheckersService} from './checkers.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.css'],
})
export class SpaceComponent {
  @Input() space: Space;
  constructor(
    private service: GameService,
    private checkerService: CheckersService
  ) {}

  highlightSpace(): void {
    console.log('Piece clicked Row ', this.space.piece);
  }
}
