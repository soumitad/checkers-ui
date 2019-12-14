import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GameBoardComponent } from './game/game-board.component';
import { GameConsoleComponent } from './game/game-console.component';
import { GameComponent } from './game/game.component';
import { AppRoutingModule } from './app-routing.module';
import { GameService } from './game/game.service';
import { KingComponent } from './game/king.component';
import { PawnComponent } from './game/pawn.component';
import { SpaceComponent } from './game/space.component';
import {CheckersService} from './game/checkers.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor, JwtInterceptor} from './_helpers';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExistingGameComponent } from './existing-game/existing-game.component';
import {SocketClientService} from './game/SocketClientService';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { GameplayStatsComponent } from './gameplay-stats/gameplay-stats.component';
import { MoveHistoryComponent } from './move-history/move-history.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
      AppComponent,
    GameComponent,
    GameBoardComponent,
    GameConsoleComponent,
    SpaceComponent,
    PawnComponent,
    KingComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ExistingGameComponent,
    GameplayStatsComponent,
    MoveHistoryComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      GameService,
    CheckersService,
    SocketClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
