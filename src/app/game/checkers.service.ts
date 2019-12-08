import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Space} from './space';
import {Piece} from './piece';
import {map} from 'rxjs/operators';
import {UserGames} from '../existing-game/existing-game.component';
import {environment} from '../../environments/environment';
import {GameRequest} from '../dashboard/dashboard.component';

export class GameInfo {
  gameId: string;
  player1: string;
  player2: string;
  gameBoard: Space[][];
}

export class GamePlayRequest {
  gameId: string;
  color: string;
  type: string;
  pieceId: string;
  currentPosition: string;
  movePosition: string;
}

export class CheckersMoveResponse {
  move: Space;
  jump: boolean;
  winner: boolean;
  king: boolean;
  moveStatus: boolean;
  doubleJumpPossible?: boolean;
  doubleJumpSpace?: Space;
}

@Injectable()
export class CheckersService {

  public observableBoard: Observable<Space[][]>;
  public board: Space[][];
  private usersUrl: string;
  public selectedSpace: Space;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/checkers/game/102';
  }

  public getCheckersBoard(gameId: string): Observable<GameInfo> {
    return this.http.get<GameInfo>(`${environment.apiUrl}/checkers/game/${gameId}`);
  }

  public setSelectedSpace(space: Space): void {
    console.log('Selected Space ', space);
    this.selectedSpace = space;
  }

  public fetchLegalMoves(space: Space): void {
    console.log('Piece selected');
    if (!!this.selectedSpace && this.selectedSpace !== space) {
      this.clearSelections();
    }
    this.selectedSpace = space;
    const p: Piece = space.piece;
    let allowedSpaces: Space[] = [];
    this.findPiece(p).highlight = true;
    console.log('Piece ', p);
    const pa = new HttpParams().set('color', p.color).set('pieceId', p.pieceId)
        .set('currentPosition', space.row + '-' + space.col).set('type', p.type);
    console.log('Params ', pa);
    this.http.get<Space[]>('http://localhost:8080/checkers/102/moves?', {params: pa}).subscribe((res) => {
      allowedSpaces = res;
      allowedSpaces.forEach(allowedSpace => {
        const boardSpace = this.checkBoardSpace(allowedSpace.row, allowedSpace.col);
        console.log('Inside here ', boardSpace);
        if (boardSpace.row === allowedSpace.row && boardSpace.col === allowedSpace.col) {
          boardSpace.highlight = true;
        }
      });
    });
  }

  public performMove(space: Space): void {
    console.log('Selected Piece ', space);
    const currentPosition = this.selectedSpace.row + '-' + this.selectedSpace.col;
    const movePosition = space.row + '-' + space.col;
    const pieceId = this.selectedSpace.piece.pieceName;
    const color = this.selectedSpace.piece.color;
    const type = this.selectedSpace.piece.type;
    let gamePlayRequest: GamePlayRequest;
    let gamePlayResponse: CheckersMoveResponse;
    gamePlayRequest = {
      currentPosition,
      movePosition,
      pieceId,
      color,
      type,
      gameId: '102'
    };
    this.http.put<CheckersMoveResponse>('http://localhost:8080/checkers/102/space', gamePlayRequest).subscribe((result) => {
      gamePlayResponse = result;
    });
    space.piece = this.selectedSpace.piece;
    this.selectedSpace.piece = null;
    this.clearSelections();
    // Based on Jumped piece in the response, remove it from the board
    // Check if any winner
    // Check if a Piece can be turned into King
    // Check if it was jump, then clear opponent piece, also check if a double jump possible?
  }

  // Finds a piece on the board and returns the space it is on
  findPiece(p: Piece): Space {
    let sp: Space = null;

    // Look through the board and see if the piece is on a space
    this.board.forEach(row => row.forEach(space => {
      if (space.piece === p) {
        sp = space;
      }
    }));

    return sp;
  }

  checkBoardSpace(row: number, col: number): Space {
    if (row < 8 && row > -1 && col < 8 && col > -1) {
      return this.board[row][col];
    } else {
      return null;
    }
  }

  // Clears all highlights, direction flags, and selected pieces from board
  clearSelections() {
    this.board.forEach(row => row.forEach(space => {
      space.highlight = space.moveTo = space.jump = false;
      if (space.piece !== null) {
        space.piece.jump = false;
      }
    }));
  }

  fetchExistingGamesForUser(username: string): Observable<UserGames[]> {
    return this.http.get<UserGames[]>(`${environment.apiUrl}/user/${username}/games`);
  }

  createNewGame(gameRequest: GameRequest): Observable<UserGames> {
    return this.http.post<UserGames>(`${environment.apiUrl}/checkers/game`, gameRequest);
  }
}
