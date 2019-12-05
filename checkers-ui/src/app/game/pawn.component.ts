import { Component, Input }	from '@angular/core';
import { Pawn }	from './piece';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'pawn',
  templateUrl: './pawn.component.html',
  styleUrls: ['./pawn.component.css'],
})
export class PawnComponent {
  @Input() pawn: Pawn;
}
