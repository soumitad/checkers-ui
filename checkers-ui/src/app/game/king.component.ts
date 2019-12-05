import { Component, Input }	from '@angular/core';
import { King } from './piece';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'king',
  templateUrl: './king.component.html',
  styleUrls: ['./king.component.css'],
})
export class KingComponent {
  @Input() king: King;
}
