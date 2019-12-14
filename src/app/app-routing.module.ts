import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { AuthGuard } from './_helpers';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ExistingGameComponent} from './existing-game/existing-game.component';
import {GameplayStatsComponent} from './gameplay-stats/gameplay-stats.component';
import {MoveHistoryComponent} from './move-history/move-history.component';

const routes: Routes = [
  { path: 'game', component: GameComponent, canActivate: [AuthGuard]},
  { path: 'game/:id', component: GameComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'existing-game/:userName', component: ExistingGameComponent, canActivate: [AuthGuard]},
  { path: 'gameplay-stats', component: GameplayStatsComponent, canActivate: [AuthGuard]},
  { path: 'move-history/:id', component: MoveHistoryComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
