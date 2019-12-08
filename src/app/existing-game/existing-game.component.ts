import { Component, OnInit } from '@angular/core';
import {CheckersService} from '../game/checkers.service';
import {environment} from '../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {Space} from '../game/space';
import {AuthenticationService} from '../_services';

export class UserGames {
  player1: string;
  player2: string;
  gameId: string;
  link: string;
  board?: Space[][];
}

@Component({
  selector: 'app-existing-game',
  templateUrl: './existing-game.component.html',
  styleUrls: ['./existing-game.component.css']
})
export class ExistingGameComponent implements OnInit {

  public userGames: UserGames[] = [];
  public userName: string;
  constructor(private checkerService: CheckersService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService) {
    this.userName = this.route.snapshot.paramMap.get('userName');
    this.userName = this.authService.loggedInUser.userName;
  }

  ngOnInit() {
    this.checkerService.fetchExistingGamesForUser(this.userName).subscribe((result) => {
      this.userGames = result;
      console.log('Existing games ', this.userGames);
      this.userGames.forEach((userGame) => {
        userGame.link = `${environment.apiUrl}/game/{userGame.gameId}`;
      });
    });
  }

  joinGame(game: UserGames) {
    console.log('', game);
    this.router.navigate(['/game', game.gameId]);
  }
}
