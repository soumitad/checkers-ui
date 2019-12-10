import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../_services';
import {User} from '../register/register.component';
import {CheckersService} from '../game/checkers.service';

export class GameRequest {
  player1: string;
  player2: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public disableCreateNewGameButton: boolean;
  public enablePlayerInvite: boolean;
  public loggedInUser: User;
  public player2: string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService,
              private checkerService: CheckersService) {
    this.disableCreateNewGameButton = false;
    this.enablePlayerInvite = false;
  }

  ngOnInit() {
    this.disableCreateNewGameButton = false;
    this.enablePlayerInvite = false;
    this.loggedInUser = this.authService.loggedInUser;
  }

  enableGameCreation(): void {
    this.disableCreateNewGameButton = true;
    this.enablePlayerInvite = true;
  }

    listExistingGames() {
      this.router.navigate(['/existing-game', this.loggedInUser.userName]);
    }

  createNewGame() {
    const gameRequest: GameRequest = {player1: this.loggedInUser.userName, player2: this.player2};
    this.checkerService.createNewGame(gameRequest).subscribe((result) => {
      this.router.navigate(['/game', result.gameId]);
    });
    console.log(this.player2);
  }

    viewGamePlayStats() {
      this.router.navigate(['/gameplay-stats']);
    }
}
