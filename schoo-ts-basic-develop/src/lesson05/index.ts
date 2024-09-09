class Piece {
  color: 'black' | 'white';

  constructor(color: 'black' | 'white') {
    this.color = color;
  }

  flip() {
    this.color = this.color === 'black' ? 'white' : 'black';
  }
}

class Board {
  grid: (Piece | null)[][] = [];

  constructor() {
    for (let i = 0; i < 8; i++) {
      this.grid[i] = [];
      for (let j = 0; j < 8; j++) {
        this.grid[i][j] = null;
      }
    }
    this.grid[3][3] = new Piece('white');
    this.grid[4][4] = new Piece('white');
    this.grid[3][4] = new Piece('black');
    this.grid[4][3] = new Piece('black');
  }

  private getPiece(row: number, col: number): Piece | null {
    return this.grid[row][col];
  }

  placePiece(row: number, col: number, piece: Piece): void {
    this.grid[row][col] = piece;
  }

  flipPiece(row: number, col: number): void {
    const piece = this.getPiece(row, col)
    piece?.flip()
  }

  showPieces(): void {
    let board = "| "
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = this.grid[i][j]
        if (piece?.color === 'black') {
          board += "◯ | "
        } else if (piece?.color === 'white') {
          board += "● | "
        } else {
          board += "  | "
        }
      }
      if (i === 7) {
        board += "\n"
      } else {
        board += "\n| "
      }
    }
    console.log(board)
  }
}

const board = new Board()
board.showPieces()

// 先行の黒を置く
const firstPiece = new Piece('black')
board.placePiece(4, 5, firstPiece)
board.flipPiece(4, 4)
board.showPieces()

// 後攻の白を置く
const secondPiece = new Piece('white')
board.placePiece(5, 3, secondPiece)
board.flipPiece(4, 3)
board.showPieces()
