/* eslint-disable */

// read the code
export class Game {
  private _lastSymbol = " ";
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateMove(symbol, x, y);
    this.updateGameState(symbol, x, y);
  }

   private validateMove(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayerTurn(symbol);
    this.validatePosition(x, y);
  }

  private validateFirstMove(symbol: string): void {
    if (this._lastSymbol === " " && symbol === "O") {
      throw new Error("Invalid first player");
    }
  }

  private validatePlayerTurn(symbol: string): void {
    if (this._lastSymbol !== " " && symbol === this._lastSymbol) {
      throw new Error("Invalid next player");
    }
  }

  private validatePosition(x: number, y: number): void {
    if (this._lastSymbol !== " " && this._board.TileAt(x, y).Symbol !== " ") {
      throw new Error("Invalid position");
    }
  }

  private updateGameState(symbol: string, x: number, y: number): void {
    this._lastSymbol = symbol;
    this._board.AddTileAt(symbol, x, y);
  }

  public Winner(): string {
    for (let row = 0; row < 3; row++) {
      const winner = this.checkRow(row);
      if (winner !== " ") {
        return winner;
      }
    }
    return " ";
}

private checkRow(row: number): string {
    const first = this._board.TileAt(row, 0).Symbol;

    if (first === " ") {
      return " ";
    }

    for (let col = 1; col < 3; col++) {
      if (this._board.TileAt(row, col).Symbol !== first) {
        return " ";
      }
    }

    return first;
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: " " };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    //@ts-ignore
    const tile: Tile = { X: x, Y: y, Symbol: symbol };
    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}

