import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { FakeBackendProvider } from './_helpers';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

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
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

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
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    GameService,
    CheckersService,
    // provider used to create fake backend
    FakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
