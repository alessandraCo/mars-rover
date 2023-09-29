import MarsMap from "./MarsMap";

export enum Directions {
  N = 0,
  E,
  S,
  W,
}

export enum Command {
  f = "move forward",
  b = "move backward",
  l = "rotate left",
  r = "rotate right",
}

class Rover {
  private startingPoint: [number, number];
  private facingDirection: Directions;
  private map: MarsMap;


  public static landingManager(coordinates: [number, number],
    direction: Directions,
    map : MarsMap) : Rover | null {
      let [x, y] : [number, number] = coordinates;
      if((x < 0 || x >= map.getDimension()) || (y<0 || y >=map.getDimension())) {
        console.log("Error: invalid starting position");
        return null;
      }
      const position = map.getBoard()[x][y];
      if(position.obstacle) {
        console.log("Landing failed!");
        return null;
      } else {
        console.log("Landing...");
        const rover : Rover = new Rover(coordinates, direction, map);
        rover.updateMap();
        return rover;
      }
  }

  public constructor(
    coordinates: [number, number],
    direction: Directions,
    map : MarsMap
  ) {
    this.startingPoint = coordinates;
    this.facingDirection = direction;
    this.map = map;
  }

  public getStartingPoint(): [number, number] {
    return this.startingPoint;
  }

  public setStartingPoint(coordinates: [number, number]): void {
    this.startingPoint = coordinates;
  }

  public getFacingDirection(): Directions {
    return this.facingDirection;
  }

  public setFacingDirection(newDirection: Directions): void {
    this.facingDirection = newDirection;
  }

  public getMap(): MarsMap {
    return this.map;
  }

  //returns true if in the considered (x,y) coordinates there is an obstacle
  public checkObstacles(x: number, y: number): boolean {
    const position = this.getMap().getBoard()[x][y];
    if (position.obstacle) {
      return true;
    } else {
      return false;
    }
  }

  //moves forward or backward
  public move(command: Command): boolean {
    console.log("Executing command: " + command);
    //actual rover position
    const [actualX, actualY]: [number, number] = this.getStartingPoint();
    //actual rover facing direction
    const actualDirection: Directions = this.facingDirection;
    //map dimension
    const maxDim: number = this.map.getDimension();
    //new coordinates
    let newX: number = actualX;
    let newY: number = actualY;
    switch (command) {
      case Command.f: {
        switch (actualDirection) {
          case Directions.N: {
            //moving upwards
            newY = actualY; //same y value
            if (actualX === 0) {
              newX = maxDim - 1;
            } else {
              newX = actualX - 1;
            }
            break;
          }
          case Directions.E: {
            //moving to right
            newX = actualX; //same y value
            if (actualY === maxDim - 1) {
              newY = 0;
            } else {
              newY = actualY + 1;
            }
            break;
          }
          case Directions.S: {
            //moving downwards
            newY = actualY; //same y value
            if (actualX === maxDim - 1) {
              newX = 0;
            } else {
              newX = actualX + 1;
            }
            break;
          }
          case Directions.W: {
            //moving to left
            newX = actualX; //same x value
            if (actualY === 0) {
              newY = maxDim - 1;
            } else {
              newY = actualY - 1;
            }
            break;
          }
        }
        break;
      }
      case Command.b: {
        switch (actualDirection) {
          case Directions.N: {
            //moving downward
            newY = actualY; //same y value
            if (actualX === maxDim - 1) {
              newX = 0;
            } else {
              newX = actualX + 1;
            }
            break;
          }
          case Directions.E: {
            //moving to left
            newX = actualX; //same x value
            if (actualY === 0) {
              newY = maxDim - 1;
            } else {
              newY = actualY - 1;
            }
            break;
          }
          case Directions.S: {
            //moving upwards
            newY = actualY; //same y value
            if (actualX === 0) {
              newX = maxDim - 1;
            } else {
              newX = actualX - 1;
            }
            break;
          }
          case Directions.W: {
            //moving to right
            newX = actualX; //same x value
            if (actualY === maxDim - 1) {
              newY = 0;
            } else {
              newY = actualY + 1;
            }
            break;
          }
        }
        break;
      }
    }
    //if there is an obstacle in the next position
    if (this.checkObstacles(newX, newY)) {
      console.log("Sequence aborted: obstacle on the way");
      this.setStartingPoint([actualX, actualY]);
      this.updateMap();
      return false;
    } else {
      this.setStartingPoint([newX, newY]);
      this.updateMap();
      return true;
    }
  }

  //rotates left or right
  public rotate(command: Command): boolean {
    console.log("Executing command: " + command);
    //actual direction that the rover is facing
    const actualFacingDirection: Directions = this.facingDirection;
    //getting the dimension of the enum that contains the four directions (North, East, South, West)
    const directionEnumLength: number = Object.keys(Directions).length / 2;
    let newFacingDirection: Directions;
    switch (command) {
      //case command = rotate right
      case Command.r:
        newFacingDirection = actualFacingDirection + 1;
        //to make the new direction in bound
        while (newFacingDirection >= directionEnumLength) {
          newFacingDirection -= directionEnumLength;
        }
        this.setFacingDirection(newFacingDirection);
        break;
      //case command = rotate left
      case Command.l:
        newFacingDirection = actualFacingDirection - 1;
        //to make the new direction in bound
        while (newFacingDirection < 0) {
          newFacingDirection += directionEnumLength;
        }
        this.setFacingDirection(newFacingDirection);
        break;
    }
    this.updateMap();
    return true;
  }

  //checks the individual command: returns 1 if the command is accepted; returns 0 if the command is not accepted
  public isValidCommand(command: string): number {
    for (const acceptedCommand in Command) {
      if (command === acceptedCommand) {
        return 1;
      }
    }
    console.log("Error: " + command + " is not a valid command");
    return 0;
  }

  //checks the entire sequence of commands: returns true if all commands are accepted; returns false if there is at least one erroneous command
  public isValidSequence(commandSequence: string[]): boolean {
    //count the number of correct commands
    let rightCommand: number = 0;
    commandSequence.forEach((command) => {
      rightCommand += this.isValidCommand(command);
    });
    //if the number of right command is not equal to the number of total commands
    if (rightCommand !== commandSequence.length) {
      return false;
    }
    //if all commands are correct
    else {
      return true;
    }
  }

  //method that calls the correct move function based on the given command
  //input: string of commands
  public getCommand(commandList: string): void {
    //taking all the individual commands
    const commandArray = commandList.split(" ");
    //if all commands are valid
    if (this.isValidSequence(commandArray)) {
      console.log("Sequence accepted");
      let successfullyEnd: boolean = false;
      for (let i = 0; i < commandArray.length; i++) {
        const commandEnum: Command =
          Command[commandArray[i] as keyof typeof Command];
        if (commandEnum === Command.f || commandEnum === Command.b) {
          successfullyEnd = this.move(commandEnum);
        } else if (commandEnum === Command.l || commandEnum === Command.r) {
          successfullyEnd = this.rotate(commandEnum);
        } else {
          successfullyEnd = false;
        }
        if (!successfullyEnd) {
          break;
        }
      }
      if (successfullyEnd) {
        console.log("Sequence successfully terminated!");
      } else {
        console.log("Some errors occurred during the sequence");
        return;
      }
    }
    //if the command sequence was erroneous
    else {
      console.log("Error: sequence aborted");
      return;
    }
  }

  public updateMap() : void {
    this.map.updateRoverDirection(this.getFacingDirection());
    this.map.updateRoverPosition(this.getStartingPoint());
  }
 }

export default Rover;
