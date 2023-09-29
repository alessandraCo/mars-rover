import MarsMap from "./MarsMap";
import Rover, { Directions, Command } from "./Rover";
import promptSync from "prompt-sync";

function App() {
  console.log("Welcome to this simulation!");
  const prompt = promptSync();
  const dim: number = 6;
  const map = new MarsMap(dim);
  map.printBoard();
  console.log("Choose the rover landing coordinates and the direction to face");
  //checking inputs: coordinate x between 0 and maxDim
  let input = prompt("x: ");
  let xNum: number = Number(input);
  while (xNum >= dim || xNum < 0) {
    console.log("Invalid input: please insert a number between 0 and " + dim);
    input = prompt("x: ");
    xNum = Number(input);
  }
  //checking inputs: coordinate y between 0 and maxDim
  input = prompt("y: ");
  let yNum: number = Number(input);
  while (yNum >= dim || yNum < 0) {
    console.log("Invalid input: please insert a number between 0 and " + dim);
    input = prompt("y: ");
    yNum = Number(input);
  }
  //checking inputs: valid direction
  input = prompt("Direction (N, E, S, W): ");
  let directionEnum: Directions = Directions[input as keyof typeof Directions];
  let validDirection: boolean = false;
  while (!validDirection) {
    if (
      directionEnum === Directions.N ||
      directionEnum === Directions.E ||
      directionEnum === Directions.S ||
      directionEnum === Directions.W
    ) {
      validDirection = true;
    } else {
      console.log("Invalid input: please insert N or E or S or W");
      input = prompt("Direction (N, E, S, W): ");
      directionEnum = Directions[input as keyof typeof Directions];
    }
  }
  //initializing the rover
  const landedRover: Rover | null = Rover.landingManager(
    [xNum, yNum],
    directionEnum,
    map
  );
  if (landedRover === null) {
    console.log("sequence aborted: obstacle in the starting point");
    return;
  } else {
    console.log("Landed!");
    map.printBoard();
    console.log("////                       COMMAND LIST                        \\\\");
    console.log("////Insert each command separated by spacebar; insert Q to quit\\\\");
    for(let command in Command) {
        console.log(command);
    }
    input = prompt("Insert commands: ");
    while(input !== "Q") {
        landedRover.getCommand(input);
        map.printBoard();
        input = prompt("Insert commands: ");
    }
  }
}

export default App;
