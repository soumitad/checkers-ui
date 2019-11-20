export class Piece {
  type = 'piece';
  isRed = true;
  jump = false; // Says whether the piece was jumped or not
  row: number = null;
  col: number = null;
  color: string;

  constructor(color: string, r: number, c: number) {
    if (color === 'black') {
      this.isRed = false;
    } else if (color === 'red') {
      this.isRed = true;
    }
    this.row = r;
    this.col = c;
  }

  // Generic move piece function
  movePiece(r: number, c: number) {
    this.row = r;
    this.col = c;
  }
}

export class Pawn extends Piece {
  type = 'pawn';

  // Nextdoor space moves
  getUpRightMove() {
    const col = this.col + 1;
    const row = this.isRed ? this.row + 1 : this.row - 1;
    return {row, col};
  }

  getUpLeftMove() {
    const col = this.col - 1;
    const row = this.isRed ? this.row + 1 : this.row - 1;
    return {row, col};
  }

  // Diag moves
  getDiagUpRightMove() {
    const col = this.col + 2;
    const row = this.isRed ? this.row + 2 : this.row - 2;
    return {row, col};
  }

  getDiagUpLeftMove() {
    const col = this.col - 2;
    const row = this.isRed ? this.row + 2 : this.row - 2;
    return {row, col};
  }
}

export class King extends Pawn {
  type = 'king';

  // Nextdoor space moves
  getDownRightMove() {
    const col = this.col + 1;
    const row = this.isRed ? this.row - 1 : this.row + 1;
    return {row, col};
  }

  getDownLeftMove() {
    const col = this.col - 1;
    const row = this.isRed ? this.row - 1 : this.row + 1;
    return {row, col};
  }

  // Diag moves
  getDiagDownRightMove() {
    const col = this.col + 2;
    const row = this.isRed ? this.row - 2 : this.row + 2;
    return {row, col};
  }

  getDiagDownLeftMove() {
    const col = this.col - 2;
    const row = this.isRed ? this.row - 2 : this.row + 2;
    return {row, col};
  }
}
