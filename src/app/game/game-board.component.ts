// This will be a component that houses the actual checkers game board
import {Component, EventEmitter, Input, Output} from '@angular/core';
import { OnInit } from '@angular/core';
import {from, Observable} from 'rxjs';
import { GameService } from './game.service';
import {CheckersService} from './checkers.service';
import {AuthenticationService} from '../_services';
import {User} from '../register/register.component';
import {SocketClientService} from './SocketClientService';
import {Piece} from './piece';
@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})
export class GameBoardComponent implements OnInit {
  public board: any;
  @Input() public gameId: string;
  @Output() public currentTurn = new EventEmitter();
  public loggedInUser: User;
  public disableSpace = true;
  public loggedInUserColor: string;
  public boardTurn: string;
  // Observables
    public resetGame$: Observable<boolean>;
    constructor(private service: GameService,
                public checkerService: CheckersService,
                private authService: AuthenticationService,
                private socketClientService: SocketClientService
    ) {}
    ngOnInit() {
      /* this.board = this.service.board; */
      this.socketClientService.onNewMessage().subscribe((fromServer) => {
        if (this.loggedInUser.userName === fromServer.currentTurn) {
          console.log('From Server updates ', fromServer);
          // Server side updates from the other end
          this.checkerService.currentTurn = fromServer.currentTurn;
          if (this.loggedInUser.userName === fromServer.currentTurn) {
            this.checkerService.disabled = false;
          }
          // Clear piece from current space
          const movedPieceRow = fromServer.moveRow;
          const movePieceCol = fromServer.moveCol;
          let p: Piece;
          this.checkerService.board.forEach(row => row.forEach(space => {
            if (space.row === movedPieceRow && space.col === movePieceCol) {
              console.log('Trying to remove this piece for more RTU');
              console.log('', space.row, '-', space.col);
              p = space.piece;
              space.piece = null;
            }
          }));
          const toRow = fromServer.toRow;
          const toCol = fromServer.toCol;
          this.checkerService.board.forEach(row => row.forEach(space => {
            if (space.row === toRow && space.col === toCol) {
              if (fromServer.type === 'Pawn' && !fromServer.isKing) {
                console.log('To Row ', toRow, '-', toCol);
                console.log('Piece ', p);
                space.piece = p;
              } else {
                p.type = 'King';
                space.piece = p;
              }
            }
          }));
          if (fromServer.jump) {
            const jumpSpace = this.checkerService.checkBoardSpace(fromServer.jumpRow, fromServer.jumpCol);
            jumpSpace.piece = null;
          }
        }
      });
      this.loggedInUser = this.authService.loggedInUser;
      this.checkerService.getCheckersBoard(this.gameId).subscribe((result) => {
        this.board = result.gameBoard;
        this.checkerService.board = this.board;
        this.currentTurn.emit(result.currentTurn);
        this.checkerService.currentTurn = result.currentTurn;
        this.boardTurn = this.checkerService.currentTurn;
        this.disableSpace = this.loggedInUser.userName !== result.currentTurn;
        this.checkerService.disabled = this.disableSpace;
        if (this.loggedInUser.userName === result.player1) {
          this.loggedInUserColor = 'Black';
        } else {
          this.loggedInUserColor = 'Red';
        }
        this.checkerService.loggedInUserColor = this.loggedInUserColor;
        console.log('Board ', result);
      });
    }
}
