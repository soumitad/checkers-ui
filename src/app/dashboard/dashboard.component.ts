import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public disableCreateNewGameButton: boolean;
  public enablePlayerInvite: boolean;
  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.disableCreateNewGameButton = false;
    this.enablePlayerInvite = false;
  }

  ngOnInit() {
    this.disableCreateNewGameButton = false;
    this.enablePlayerInvite = false;
  }

  enableGameCreation(): void {
    this.disableCreateNewGameButton = true;
    this.enablePlayerInvite = true;
  }

    listExistingGames() {
      this.router.navigate(['/existing-game']);
    }
}
