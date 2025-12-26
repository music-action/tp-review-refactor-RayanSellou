/* eslint-disable */

const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const playerO = "O";
const noPlayer = " ";

export class Game {
  private _lastPlayer = noPlayer;
  private _board: Board = new Board();

  public Play(tile: Tile): void {
    this.validateFirstMove(tile.Player);
    this.validatePlayer(tile.Player);
    this.validatePositionIsEmpty(tile);

    this.updateLastPlayer(tile.Player);
    this.updateBoard(tile);
  }

  private validateFirstMove(player: string) {
    if (this._lastPlayer === noPlayer && player === playerO) {
      throw new Error("Invalid first player");
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastPlayer) {
      throw new Error("Invalid next player");
    }
  }

  private validatePositionIsEmpty(tile: Tile) {
    if (this._board.isTilePlayedAt(tile)) {
      throw new Error("Invalid position");
    }
  }

  private updateLastPlayer(player: string) {
    this._lastPlayer = player;
  }

  private updateBoard(tile: Tile) {
    this._board.AddTileAt(tile);
  }

  public Winner(): string {
    return this._board.findRowFullWithSamePlayer();
  }
}

export class Tile {
  private x: number = 0;
  private y: number = 0;
  private player: string = noPlayer;

  constructor(x: number, y: number, player: string) {
    this.x = x;
    this.y = y;
    this.player = player;
  }

  get Player() {
    return this.player;
  }

  get isNotEmpty() {
    return this.Player !== noPlayer;
  }

  hasSamePlayerAs(other: Tile) {
    return this.Player === other.Player;
  }

  hasSameCoordinatesAs(other: Tile) {
    return this.x == other.x && this.y == other.y;
  }

  updatePlayer(newPlayer: string) {
    this.player = newPlayer;
  }
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let x = firstRow; x <= thirdRow; x++) {
      for (let y = firstColumn; y <= thirdColumn; y++) {
        this._plays.push(new Tile(x, y, noPlayer));
      }
    }
  }

  public isTilePlayedAt(tile: Tile) {
    return this._plays.find((t) => t.hasSameCoordinatesAs(tile))!.isNotEmpty;
  }

  public AddTileAt(tile: Tile): void {
    this._plays
      .find((t) => t.hasSameCoordinatesAs(tile))!
      .updatePlayer(tile.Player);
  }

  public findRowFullWithSamePlayer(): string {
    const rows = [firstRow, secondRow, thirdRow];
    for (const row of rows) {
      if (this.isRowFull(row) && this.isRowFullWithSamePlayer(row)) {
        return this.playerAt(row, firstColumn);
      }
    }

    return noPlayer;
  }

  private hasSamePlayer(x: number, y: number, otherX: number, otherY: number) {
    return this.TileAt(x, y)!.hasSamePlayerAs(this.TileAt(otherX, otherY)!);
  }

  private playerAt(x: number, y: number) {
    return this.TileAt(x, y)!.Player;
  }

  private TileAt(x: number, y: number): Tile {
    return this._plays.find((t) =>
      t.hasSameCoordinatesAs(new Tile(x, y, noPlayer))
    )!;
  }

  private isRowFull(row: number) {
    return (
      this.isTilePlayedAt(new Tile(row, firstColumn, noPlayer)) &&
      this.isTilePlayedAt(new Tile(row, secondColumn, noPlayer)) &&
      this.isTilePlayedAt(new Tile(row, thirdColumn, noPlayer))
    );
  }

  private isRowFullWithSamePlayer(row: number) {
    return (
      this.hasSamePlayer(row, firstColumn, row, secondColumn) &&
      this.hasSamePlayer(row, secondColumn, row, thirdColumn)
    );
  }
}
