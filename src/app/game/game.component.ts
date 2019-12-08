import {Component, Input, OnInit} from '@angular/core';
import { GameService } from './game.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  public board: any;
  @Input() public gameId: string;
  constructor(private service: GameService,
              private route: ActivatedRoute,
              private router: Router) {
    this.gameId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.board = this.service.board;

  }

}
