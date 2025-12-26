/* eslint-disable */

const ROW_1 = 0;
const ROW_2 = 1;
const ROW_3 = 2;
const COL_1 = 0;
const COL_2 = 1;
const COL_3 = 2;

const PLAYER_O = 'O';
const EMPTY = ' ';

export class TicTacToeGame {
  private _lastPlayedSymbol = EMPTY;
  private _board: Board = new Board();

  public play(symbol: string, row: number, col: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayerTurn(symbol);
    this.validateCellIsEmpty(row, col);
    this.updateLastPlayed(symbol);
    this.updateBoard(symbol, row, col);
  }

  private validateFirstMove(player: string) {
    if (this._lastPlayedSymbol === EMPTY && player === PLAYER_O) {
      throw new Error('Player X must start the game');
    }
  }

  private validatePlayerTurn(player: string) {
    if (player === this._lastPlayedSymbol) {
      throw new Error('It is not this player’s turn');
    }
  }

  private validateCellIsEmpty(row: number, col: number) {
    if (this._board.getCell(row, col).isOccupied) {
      throw new Error('Cell is already occupied');
    }
  }

  private updateLastPlayed(player: string) {
    this._lastPlayedSymbol = player;
  }

  private updateBoard(player: string, row: number, col: number) {
    this._board.setCellSymbol(player, row, col);
  }

  public getWinner(): string {
    return this._board.findWinningRow() || EMPTY;
  }
}

class Cell {
  private row: number;
  private col: number;
  private symbol: string;

  constructor(row: number, col: number, symbol: string) {
    this.row = row;
    this.col = col;
    this.symbol = symbol;
  }

  get Symbol() {
    return this.symbol;
  }

  get isOccupied() {
    return this.symbol !== EMPTY;
  }

  hasSameSymbolAs(other: Cell) {
    return this.symbol === other.symbol;
  }

  hasSameCoordinatesAs(other: Cell) {
    return this.row === other.row && this.col === other.col;
  }

  setSymbol(symbol: string) {
    this.symbol = symbol;
  }
}

class Board {
  private _cells: Cell[] = [];

  constructor() {
    for (let r = ROW_1; r <= ROW_3; r++) {
      for (let c = COL_1; c <= COL_3; c++) {
        this._cells.push(new Cell(r, c, EMPTY));
      }
    }
  }

  public getCell(row: number, col: number): Cell {
    return this._cells.find(cell => cell.hasSameCoordinatesAs(new Cell(row, col, EMPTY)))!;
  }

  public setCellSymbol(symbol: string, row: number, col: number): void {
    this._cells.find(cell => cell.hasSameCoordinatesAs(new Cell(row, col, EMPTY)))!.setSymbol(symbol);
  }

  public findWinningRow(): string | null {
    const rows = [ROW_1, ROW_2, ROW_3];
    for (const row of rows) {
      if (this.isRowFull(row) && this.isRowSameSymbol(row)) {
        return this.getCell(row, COL_1).Symbol;
      }
    }
    return null;
  }

  private isRowFull(row: number) {
    return (
      this.getCell(row, COL_1).isOccupied &&
      this.getCell(row, COL_2).isOccupied &&
      this.getCell(row, COL_3).isOccupied
    );
  }

  private isRowSameSymbol(row: number) {
    const first = this.getCell(row, COL_1);
    const second = this.getCell(row, COL_2);
    const third = this.getCell(row, COL_3);
    return first.hasSameSymbolAs(second) && second.hasSameSymbolAs(third);
  }
}
