import { Directions } from "./Rover";

class Cell {
  public obstacle: boolean = this.generateRandomObstacle();

  //generates randomly an obstacle on the cell
  private generateRandomObstacle(): boolean {
    //40% there is an obstacle
    let thereIsObstacle: boolean = Math.random() > 0.4;
    return thereIsObstacle;
  }
}

class MarsMap {
  private board: Cell[][] = [];
  private dimension: number = 0;
  private roverPosition : [number | null, number | null] = [null,null];
  private roverDirection : Directions | null = null;

  public constructor(dimension: number) {
    if (dimension === 0) {
      return;
    } else {
      this.dimension = dimension;
      for (let i = 0; i < dimension; i++) {
        let newRow: Cell[] = [];
        for (let j = 0; j < dimension; j++) {
          const newCell: Cell = new Cell();
          newRow.push(newCell);
        }
        this.board.push(newRow);
      }
    }
  }

  public getBoard(): Cell[][] {
    return this.board;
  }

  public getDimension(): number {
    return this.dimension;
  }

  public updateRoverDirection(newRoverDirection : Directions) : void {
    this.roverDirection = newRoverDirection;
  }

  public updateRoverPosition(newRoverPosition : [number, number]) : void {
    this.roverPosition = newRoverPosition;
  }

  public printBoard(): void {
    //rover map
    const mapDim: number = this.getDimension();
    //rover coordinates
    let [x, y]: [number | null, number | null] = this.roverPosition;
    //if the board is not initialized
    if (mapDim === 0) {
      console.log("No map available yet");
      return;
    }
    //for each row
    for (let r = 0; r < mapDim; r++) {
      for (let h = 0; h < mapDim; h++) {
        process.stdout.write("------");
      }
      console.log("-");
      //making some additional space
      for (let i = 0; i < 3; i++) {
        //for each column
        for (let c = 0; c < mapDim; c++) {
          const cell = this.getBoard()[r][c];
          if (i === 1) {
            if (cell.obstacle) {
              process.stdout.write("|  *  ");
            } else if (r === x && c === y) {
              switch (this.roverDirection) {
                case Directions.N:
                  process.stdout.write("|  ↑  ");
                  break;
                case Directions.E:
                  process.stdout.write("|  →  ");
                  break;
                case Directions.S:
                  process.stdout.write("|  ↓  ");
                  break;
                case Directions.W:
                  process.stdout.write("|  ←  ");
                  break;
              }
            } else {
              process.stdout.write("|     ");
            }
          } else {
            process.stdout.write("|     ");
          }
        }
        console.log("|");
      }
    }
  }

}

export default MarsMap;
