import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  public board: any;
  constructor(private service: GameService) {}

  ngOnInit(): void {
    this.board = this.service.board;
  }

}
