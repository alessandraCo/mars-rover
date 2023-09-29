import { execPath } from "process";
import MarsMap from "./MarsMap";
import Rover, { Directions } from "./Rover";

test("the mars rover is not in the same place of an obstacle", () => {
    const map : MarsMap = new MarsMap(4);
    const coordinates : [number, number] = [0, 0];
    const [x, y] : [number, number] = coordinates;
    const direction : Directions = Directions.N;
    let landedRover : Rover | null = Rover.landingManager(coordinates, direction, map);
    if(map.getBoard()[x][y].obstacle) {
        expect(landedRover).toEqual(null); 
    } else {
        expect(landedRover).toEqual(new Rover(coordinates, direction, map));
        map.printBoard();
    }
});

test("if the dimension is 0, no map initialized", () => {
    const map : MarsMap = new MarsMap(0);
    expect(map.getDimension()).toBe(0);
    expect(map.getBoard()).toEqual([]);
    map.printBoard();
})
