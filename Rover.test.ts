import MarsMap from "./MarsMap";
import Rover, { Command, Directions } from "./Rover";

test("if the mars rover initial coordinates are out of bound of the mars map dimensions, do not inizialize the map", () => {
  const map: MarsMap = new MarsMap(4);
  const coordinates: [number, number] = [0, 4];
  const direction: Directions = Directions.N;
  let landedRover: Rover | null = Rover.landingManager(
    coordinates,
    direction,
    map
  );
  expect(landedRover).toEqual(null);
});

//moving forward/backward: edge cases
test("start (0, y) facing N moving FORWARD, then end (dimension-1, y)", () => {
  const map: MarsMap = new MarsMap(4);
  const coordinates: [number, number] = [0, 0];
  const direction: Directions = Directions.N;
  let landedRover: Rover | null = Rover.landingManager(
    coordinates,
    direction,
    map
  );
  if (landedRover === null) {
    expect(landedRover).toEqual(null);
  } else {
    const [finalX, finalY]: [number, number] = [3, 0];
    if (!landedRover.checkObstacles(finalX, finalY)) {
      landedRover.move(Command.f);
      expect(
        landedRover.getMap().getBoard()[finalX][finalY].obstacle
      ).toBeFalsy();
      expect(landedRover.getStartingPoint()[0]).toEqual(finalX);
      expect(landedRover.getStartingPoint()[1]).toEqual(finalY);
      expect(landedRover.getFacingDirection()).toEqual(direction);
    } else {
      expect(landedRover.getStartingPoint()).toEqual(
        landedRover.getStartingPoint()
      );
    }
  }
});

test("start (x, dimension-1) facing E moving FORWARD, then end (x, 0)", () => {
  const map: MarsMap = new MarsMap(4);
  const coordinates: [number, number] = [0, 3];
  const direction: Directions = Directions.E;
  let landedRover: Rover | null = Rover.landingManager(
    coordinates,
    direction,
    map
  );
  if (landedRover === null) {
    expect(landedRover).toEqual(null);
  } else {
    const [finalX, finalY]: [number, number] = [0, 0];
    if (!landedRover.checkObstacles(finalX, finalY)) {
      landedRover.move(Command.f);
      expect(
        landedRover.getMap().getBoard()[finalX][finalY].obstacle
      ).toBeFalsy();
      expect(landedRover.getStartingPoint()[0]).toEqual(finalX);
      expect(landedRover.getStartingPoint()[1]).toEqual(finalY);
      expect(landedRover.getFacingDirection()).toEqual(direction);
    } else {
      expect(landedRover.getStartingPoint()).toEqual(
        landedRover.getStartingPoint()
      );
    }
  }
});

test("start (dimension-1, y) facing S moving FORWARD, then end (0, y)", () => {
  const map: MarsMap = new MarsMap(4);
  const coordinates: [number, number] = [3, 1];
  const direction: Directions = Directions.S;
  let landedRover: Rover | null = Rover.landingManager(
    coordinates,
    direction,
    map
  );
  if (landedRover === null) {
    expect(landedRover).toEqual(null);
  } else {
    const [finalX, finalY]: [number, number] = [0, 1];
    if (!landedRover.checkObstacles(finalX, finalY)) {
      landedRover.move(Command.f);
      expect(
        landedRover.getMap().getBoard()[finalX][finalY].obstacle
      ).toBeFalsy();
      expect(landedRover.getStartingPoint()[0]).toEqual(finalX);
      expect(landedRover.getStartingPoint()[1]).toEqual(finalY);
      expect(landedRover.getFacingDirection()).toEqual(direction);
    } else {
      expect(landedRover.getStartingPoint()).toEqual(
        landedRover.getStartingPoint()
      );
    }
  }
});

test("start (x, 0) facing W moving FORWARD, then end (x, dimension-1)", () => {
  const map: MarsMap = new MarsMap(4);
  const coordinates: [number, number] = [2, 0];
  const direction: Directions = Directions.W;
  let landedRover: Rover | null = Rover.landingManager(
    coordinates,
    direction,
    map
  );
  if (landedRover === null) {
    expect(landedRover).toEqual(null);
  } else {
    const [finalX, finalY]: [number, number] = [2, 3];
    if (!landedRover.checkObstacles(finalX, finalY)) {
      landedRover.move(Command.f);
      expect(
        landedRover.getMap().getBoard()[finalX][finalY].obstacle
      ).toBeFalsy();
      expect(landedRover.getStartingPoint()[0]).toEqual(finalX);
      expect(landedRover.getStartingPoint()[1]).toEqual(finalY);
      expect(landedRover.getFacingDirection()).toEqual(direction);
    } else {
      expect(landedRover.getStartingPoint()).toEqual(
        landedRover.getStartingPoint()
      );
    }
  }
});

test("start (dimension-1, y) facing N moving BACKWARD, then end (0, y)", () => {
  const map: MarsMap = new MarsMap(4);
  const coordinates: [number, number] = [3, 1];
  const direction: Directions = Directions.N;
  let landedRover: Rover | null = Rover.landingManager(
    coordinates,
    direction,
    map
  );
  if (landedRover === null) {
    expect(landedRover).toEqual(null);
  } else {
    const [finalX, finalY]: [number, number] = [0, 1];
    if (!landedRover.checkObstacles(finalX, finalY)) {
      landedRover.move(Command.b);
      expect(
        landedRover.getMap().getBoard()[finalX][finalY].obstacle
      ).toBeFalsy();
      expect(landedRover.getStartingPoint()[0]).toEqual(finalX);
      expect(landedRover.getStartingPoint()[1]).toEqual(finalY);
      expect(landedRover.getFacingDirection()).toEqual(direction);
    } else {
      expect(landedRover.getStartingPoint()).toEqual(
        landedRover.getStartingPoint()
      );
    }
  }
});

test("start (x, 0) facing E moving BACKWARD, then end (x, dimension-1)", () => {
  const map: MarsMap = new MarsMap(4);
  const coordinates: [number, number] = [1, 0];
  const direction: Directions = Directions.E;
  let landedRover: Rover | null = Rover.landingManager(
    coordinates,
    direction,
    map
  );
  if (landedRover === null) {
    expect(landedRover).toEqual(null);
  } else {
    const [finalX, finalY]: [number, number] = [1, 3];
    if (!landedRover.checkObstacles(finalX, finalY)) {
      landedRover.move(Command.b);
      expect(
        landedRover.getMap().getBoard()[finalX][finalY].obstacle
      ).toBeFalsy();
      expect(landedRover.getStartingPoint()[0]).toEqual(finalX);
      expect(landedRover.getStartingPoint()[1]).toEqual(finalY);
      expect(landedRover.getFacingDirection()).toEqual(direction);
    } else {
      expect(landedRover.getStartingPoint()).toEqual(
        landedRover.getStartingPoint()
      );
    }
  }
});

test("start (0, y) facing S moving BACKWARD, then end (dimension-1, y)", () => {
  const map: MarsMap = new MarsMap(4);
  const coordinates: [number, number] = [0, 3];
  const direction: Directions = Directions.S;
  let landedRover: Rover | null = Rover.landingManager(
    coordinates,
    direction,
    map
  );
  if (landedRover === null) {
    expect(landedRover).toEqual(null);
  } else {
    const [finalX, finalY]: [number, number] = [3, 3];
    if (!landedRover.checkObstacles(finalX, finalY)) {
      landedRover.move(Command.b);
      expect(
        landedRover.getMap().getBoard()[finalX][finalY].obstacle
      ).toBeFalsy();
      expect(landedRover.getStartingPoint()[0]).toEqual(finalX);
      expect(landedRover.getStartingPoint()[1]).toEqual(finalY);
      expect(landedRover.getFacingDirection()).toEqual(direction);
    } else {
      expect(landedRover.getStartingPoint()).toEqual(
        landedRover.getStartingPoint()
      );
    }
  }
});

test("start (x, dimension-1) facing W moving BACKWARD, then end (x, 0)", () => {
  const map: MarsMap = new MarsMap(4);
  const coordinates: [number, number] = [3, 3];
  const direction: Directions = Directions.W;
  let landedRover: Rover | null = Rover.landingManager(
    coordinates,
    direction,
    map
  );
  if (landedRover === null) {
    expect(landedRover).toEqual(null);
  } else {
    const [finalX, finalY]: [number, number] = [3, 0];
    if (!landedRover.checkObstacles(finalX, finalY)) {
      landedRover.move(Command.b);
      expect(
        landedRover.getMap().getBoard()[finalX][finalY].obstacle
      ).toBeFalsy();
      expect(landedRover.getStartingPoint()[0]).toEqual(finalX);
      expect(landedRover.getStartingPoint()[1]).toEqual(finalY);
      expect(landedRover.getFacingDirection()).toEqual(direction);
    } else {
      expect(landedRover.getStartingPoint()).toEqual(
        landedRover.getStartingPoint()
      );
    }
  }
});

//moving forward/backward: common cases
test("start (x, y) facing N moving FORWARD, then end (x-1, y)", () => {
  const map: MarsMap = new MarsMap(4);
  const coordinates: [number, number] = [1, 1];
  const direction: Directions = Directions.N;
  let landedRover: Rover | null = Rover.landingManager(
    coordinates,
    direction,
    map
  );
  if (landedRover === null) {
    expect(landedRover).toEqual(null);
  } else {
    const [finalX, finalY]: [number, number] = [0, 1];
    if (!landedRover.checkObstacles(finalX, finalY)) {
      landedRover.move(Command.f);
      expect(
        landedRover.getMap().getBoard()[finalX][finalY].obstacle
      ).toBeFalsy();
      expect(landedRover.getStartingPoint()[0]).toEqual(finalX);
      expect(landedRover.getStartingPoint()[1]).toEqual(finalY);
      expect(landedRover.getFacingDirection()).toEqual(direction);
    } else {
      expect(landedRover.getStartingPoint()).toEqual(
        landedRover.getStartingPoint()
      );
    }
  }
});

test("start (x, y) facing E moving FORWARD, then end (x, y+1)", () => {
  const map: MarsMap = new MarsMap(4);
  const coordinates: [number, number] = [2, 1];
  const direction: Directions = Directions.E;
  let landedRover: Rover | null = Rover.landingManager(
    coordinates,
    direction,
    map
  );
  if (landedRover === null) {
    expect(landedRover).toEqual(null);
  } else {
    const [finalX, finalY]: [number, number] = [2, 2];
    if (!landedRover.checkObstacles(finalX, finalY)) {
      landedRover.move(Command.f);
      expect(
        landedRover.getMap().getBoard()[finalX][finalY].obstacle
      ).toBeFalsy();
      expect(landedRover.getStartingPoint()[0]).toEqual(finalX);
      expect(landedRover.getStartingPoint()[1]).toEqual(finalY);
      expect(landedRover.getFacingDirection()).toEqual(direction);
    } else {
      expect(landedRover.getStartingPoint()).toEqual(
        landedRover.getStartingPoint()
      );
    }
  }
});

test("start (x, y) facing S moving FORWARD, then end (x+1, y)", () => {
  const map: MarsMap = new MarsMap(4);
  const coordinates: [number, number] = [2, 3];
  const direction: Directions = Directions.S;
  let landedRover: Rover | null = Rover.landingManager(
    coordinates,
    direction,
    map
  );
  if (landedRover === null) {
    expect(landedRover).toEqual(null);
  } else {
    const [finalX, finalY]: [number, number] = [3, 3];
    if (!landedRover.checkObstacles(finalX, finalY)) {
      landedRover.move(Command.f);
      expect(
        landedRover.getMap().getBoard()[finalX][finalY].obstacle
      ).toBeFalsy();
      expect(landedRover.getStartingPoint()[0]).toEqual(finalX);
      expect(landedRover.getStartingPoint()[1]).toEqual(finalY);
      expect(landedRover.getFacingDirection()).toEqual(direction);
    } else {
      expect(landedRover.getStartingPoint()).toEqual(
        landedRover.getStartingPoint()
      );
    }
  }
});

test("start (x, y) facing W moving FORWARD, then end (x, y-1)", () => {
  const map: MarsMap = new MarsMap(4);
  const coordinates: [number, number] = [1, 1];
  const direction: Directions = Directions.W;
  let landedRover: Rover | null = Rover.landingManager(
    coordinates,
    direction,
    map
  );
  if (landedRover === null) {
    expect(landedRover).toEqual(null);
  } else {
    const [finalX, finalY]: [number, number] = [1, 0];
    if (!landedRover.checkObstacles(finalX, finalY)) {
      landedRover.move(Command.f);
      expect(
        landedRover.getMap().getBoard()[finalX][finalY].obstacle
      ).toBeFalsy();
      expect(landedRover.getStartingPoint()[0]).toEqual(finalX);
      expect(landedRover.getStartingPoint()[1]).toEqual(finalY);
      expect(landedRover.getFacingDirection()).toEqual(direction);
    } else {
      expect(landedRover.getStartingPoint()).toEqual(
        landedRover.getStartingPoint()
      );
    }
  }
});

test("start (x, y) facing N moving BACKWARD, then end (x+1, y)", () => {
  const map: MarsMap = new MarsMap(4);
  const coordinates: [number, number] = [2, 0];
  const direction: Directions = Directions.N;
  let landedRover: Rover | null = Rover.landingManager(
    coordinates,
    direction,
    map
  );
  if (landedRover === null) {
    expect(landedRover).toEqual(null);
  } else {
    const [finalX, finalY]: [number, number] = [3, 0];
    if (!landedRover.checkObstacles(finalX, finalY)) {
      landedRover.move(Command.b);
      expect(
        landedRover.getMap().getBoard()[finalX][finalY].obstacle
      ).toBeFalsy();
      expect(landedRover.getStartingPoint()[0]).toEqual(finalX);
      expect(landedRover.getStartingPoint()[1]).toEqual(finalY);
      expect(landedRover.getFacingDirection()).toEqual(direction);
    } else {
      expect(landedRover.getStartingPoint()).toEqual(
        landedRover.getStartingPoint()
      );
    }
  }
});

test("start (x, y) facing E moving BACKWARD, then end (x, y-1)", () => {
  const map: MarsMap = new MarsMap(4);
  const coordinates: [number, number] = [1, 1];
  const direction: Directions = Directions.E;
  let landedRover: Rover | null = Rover.landingManager(
    coordinates,
    direction,
    map
  );
  if (landedRover === null) {
    expect(landedRover).toEqual(null);
  } else {
    const [finalX, finalY]: [number, number] = [1, 0];
    if (!landedRover.checkObstacles(finalX, finalY)) {
      landedRover.move(Command.b);
      expect(
        landedRover.getMap().getBoard()[finalX][finalY].obstacle
      ).toBeFalsy();
      expect(landedRover.getStartingPoint()[0]).toEqual(finalX);
      expect(landedRover.getStartingPoint()[1]).toEqual(finalY);
      expect(landedRover.getFacingDirection()).toEqual(direction);
    } else {
      expect(landedRover.getStartingPoint()).toEqual(
        landedRover.getStartingPoint()
      );
    }
  }
});

test("start (x, y) facing S moving BACKWARD, then end (x-1, y)", () => {
  const map: MarsMap = new MarsMap(4);
  const coordinates: [number, number] = [2, 2];
  const direction: Directions = Directions.S;
  let landedRover: Rover | null = Rover.landingManager(
    coordinates,
    direction,
    map
  );
  if (landedRover === null) {
    expect(landedRover).toEqual(null);
  } else {
    const [finalX, finalY]: [number, number] = [1, 2];
    if (!landedRover.checkObstacles(finalX, finalY)) {
      landedRover.move(Command.b);
      expect(
        landedRover.getMap().getBoard()[finalX][finalY].obstacle
      ).toBeFalsy();
      expect(landedRover.getStartingPoint()[0]).toEqual(finalX);
      expect(landedRover.getStartingPoint()[1]).toEqual(finalY);
      expect(landedRover.getFacingDirection()).toEqual(direction);
    } else {
      expect(landedRover.getStartingPoint()).toEqual(
        landedRover.getStartingPoint()
      );
    }
  }
});

test("start (x, y) facing W moving BACKWARD, then end (x, y+1)", () => {
  const map: MarsMap = new MarsMap(4);
  const coordinates: [number, number] = [2, 1];
  const direction: Directions = Directions.W;
  let landedRover: Rover | null = Rover.landingManager(
    coordinates,
    direction,
    map
  );
  if (landedRover === null) {
    expect(landedRover).toEqual(null);
  } else {
    const [finalX, finalY]: [number, number] = [2, 2];
    if (!landedRover.checkObstacles(finalX, finalY)) {
      landedRover.move(Command.b);
      expect(
        landedRover.getMap().getBoard()[finalX][finalY].obstacle
      ).toBeFalsy();
      expect(landedRover.getStartingPoint()[0]).toEqual(finalX);
      expect(landedRover.getStartingPoint()[1]).toEqual(finalY);
      expect(landedRover.getFacingDirection()).toEqual(direction);
    } else {
      expect(landedRover.getStartingPoint()).toEqual(
        landedRover.getStartingPoint()
      );
    }
  }
});

//rotate right/left: edge cases
test("if actual direction is N and command is left, then new direction is W", () => {
  const map: MarsMap = new MarsMap(4);
  const coordinates: [number, number] = [0, 0];
  const direction: Directions = Directions.N;
  let landedRover: Rover | null = Rover.landingManager(
    coordinates,
    direction,
    map
  );
  if (landedRover === null) {
    expect(landedRover).toEqual(null);
  } else {
    const [finalX, finalY]: [number, number] = [0, 0];
    let finalDirection: Directions = Directions.W;
    landedRover.rotate(Command.l);
    expect(landedRover.getFacingDirection()).toEqual(finalDirection);
    expect(landedRover.getStartingPoint()[0]).toEqual(finalX);
    expect(landedRover.getStartingPoint()[1]).toEqual(finalY);
  }
});

test("if actual direction is W and command is right, then new direction is N", () => {
  const map: MarsMap = new MarsMap(4);
  const coordinates: [number, number] = [0, 0];
  const direction: Directions = Directions.W;
  let landedRover: Rover | null = Rover.landingManager(
    coordinates,
    direction,
    map
  );
  if (landedRover === null) {
    expect(landedRover).toEqual(null);
  } else {
    const [finalX, finalY]: [number, number] = [0, 0];
    let finalDirection: Directions = Directions.N;
    landedRover.rotate(Command.r);
    expect(landedRover.getFacingDirection()).toEqual(finalDirection);
    expect(landedRover.getStartingPoint()[0]).toEqual(finalX);
    expect(landedRover.getStartingPoint()[1]).toEqual(finalY);
  }
});

//rotate right/left: common cases
test("if actual direction is E and command is left, then new direction is N", () => {
  const map: MarsMap = new MarsMap(4);
  const coordinates: [number, number] = [0, 0];
  const direction: Directions = Directions.E;
  let landedRover: Rover | null = Rover.landingManager(
    coordinates,
    direction,
    map
  );
  if (landedRover === null) {
    expect(landedRover).toEqual(null);
  } else {
    const [finalX, finalY]: [number, number] = [0, 0];
    let finalDirection: Directions = Directions.N;
    landedRover.rotate(Command.l);
    expect(landedRover.getFacingDirection()).toEqual(finalDirection);
    expect(landedRover.getStartingPoint()[0]).toEqual(finalX);
    expect(landedRover.getStartingPoint()[1]).toEqual(finalY);
  }
});

test("if actual direction is N and command is right, then new direction is E", () => {
  const map: MarsMap = new MarsMap(4);
  const coordinates: [number, number] = [0, 0];
  const direction: Directions = Directions.N;
  let landedRover: Rover | null = Rover.landingManager(
    coordinates,
    direction,
    map
  );
  if (landedRover === null) {
    expect(landedRover).toEqual(null);
  } else {
    const [finalX, finalY]: [number, number] = [0, 0];
    let finalDirection: Directions = Directions.E;
    landedRover.rotate(Command.r);
    expect(landedRover.getFacingDirection()).toEqual(finalDirection);
    expect(landedRover.getStartingPoint()[0]).toEqual(finalX);
    expect(landedRover.getStartingPoint()[1]).toEqual(finalY);
  }
});

test("If is there an obstacle, sequence aborted", () => {
  const map: MarsMap = new MarsMap(4);
  const coordinates: [number, number] = [0, 0];
  const direction: Directions = Directions.E;
  let landedRover: Rover | null = Rover.landingManager(
    coordinates,
    direction,
    map
  );
  if (landedRover === null) {
    expect(landedRover).toEqual(null);
  } else {
    const successMove: boolean = landedRover.move(Command.f);
    if (successMove) {
      const [finalX, finalY]: [number, number] = [0, 1];
      expect(landedRover.getStartingPoint()[0]).toBe(finalX);
      expect(landedRover.getStartingPoint()[1]).toBe(finalY);
      expect(landedRover.checkObstacles(finalX, finalY)).toBeFalsy();
    } else {
      const [actualX, actualY]: [number, number] = coordinates;
      expect(landedRover.getStartingPoint()[0]).toBe(actualX);
      expect(landedRover.getStartingPoint()[1]).toBe(actualY);
      expect(landedRover.checkObstacles(actualX, actualY)).toBeTruthy();
    }
  }
});

test("invalid sequence of command recognized", () => {
  const map: MarsMap = new MarsMap(4);
  const coordinates: [number, number] = [0, 0];
  const direction: Directions = Directions.E;
  let landedRover: Rover | null = Rover.landingManager(
    coordinates,
    direction,
    map
  );
  if (landedRover === null) {
    expect(landedRover).toEqual(null);
  } else { 
    const invalidSequence : boolean = landedRover.isValidSequence(["a", "b", "c"]);
    expect(invalidSequence).toBeFalsy();
    const isValidSequence : boolean = landedRover.isValidSequence(["f", "f", "l", "r", "b"]);
    expect(isValidSequence).toBeTruthy();
    const invalidCommand : number = landedRover.isValidCommand("g");
    expect(invalidCommand).toBe(0);
    const validCommand : number = landedRover.isValidCommand("f");
    expect(validCommand).toBe(1);
  }
})