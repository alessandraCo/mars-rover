# mars-rover
- moving a mars rover avoiding obstacles
---
## Demo
![](https://github.com/alessandraCo/mars-rover/blob/main/marsRover1.png)
![](https://github.com/alessandraCo/mars-rover/blob/main/marsRover2.png)
![](https://github.com/alessandraCo/mars-rover/blob/main/marsRover3.png)
![](https://github.com/alessandraCo/mars-rover/blob/main/marsRover4.png)
---
## Description
- first, given the map with random generated obstacles, it is necessary to decide the landing position (avoiding the obstacles!)
- then, if the rover landed successfully, it is possible to move it
-  f: forward
-  b: backward
-  l: rotate left
-  r: rotate right
- it is possible to enter the desired sequence of commands:
- the sequence will be validated:
-  in case of and obstacle on the way the sequence is aborted and the rover remains in the last valid position
-  in case of an invalid command the entire sequence will be aborted
---
### how to run the project
- open the terminal and type `ts-node index.ts`
- it is possible to customize the dimension of the mars map in the `App.ts`:
-  `const dim : number = insert your custom map dimension here`
### how to run the tests
- open the terminal and type `npm test`
