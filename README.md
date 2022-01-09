# Traffic-Lights---Multiple-Cars

## Overview
A character string represents a city road.

Cars travel on the road obeying the traffic lights..

Legend:
- . = Road
- C = Car
- G = GREEN traffic light
- O = ORANGE traffic light
- R = RED traffic light

Something like this:
`CCC.G...R...`

## Rules
## Simulation
At each iteration:
- the lights change (according to the traffic light rules), then
- the car moves, obeying the car rules

## Traffic Light Rules
Traffic lights change colour as follows:

- __GREEN__ for `5` time units... then
- __ORANGE__ for `1` time unit... then
- __RED__ for `5` time units....

... and repeat the cycle

## Car Rules
- Cars travel left to right on the road, moving 1 character position per time unit
- Cars can move freely until they come to a traffic light. Then:
- if the light is __GREEN__ they can move forward (temporarily occupying the same cell as the light)
- if the light is __ORANGE__ then they must stop (if they have already entered the intersection they can continue through)
- if the light is __RED__ the car must stop until the light turns GREEN again
- It is illegal to queue across an intersection. In other words, DO NOT enter an intersection unless you can see there is safe passage through it and out the other side!

## Kata Task
Given the initial state of the road, return the states for all iterations of the simiulation.

## Input
- road = the road array
- n = how many time units to simulate (n >= 0)

## Output
An array containing the road states at every iteration (including the initial state)
Note: If a car occupies the same position as a traffic light then show only the car

## Notes
- There are 1 or more cars
- There are 0 or more traffic lights

For the initial road state:
- cars can start anywhere except in the middle of intersections
- traffic lights are either __GREEN__ or __RED__, and are at the beginning of their countdown cycles
- There are no reaction delays - when the lights change the car drivers will react immediately!
- If a car goes off the end of the road it just disappears from view
- There will always be some road between adjacent traffic lights
- If there is a traffic light at the end of the road then its exit is never blocked
- You cannot see beyond the car in front of you, so you cannot anticipate a gap that does not yet exist

## Example
Run simulation for 16 time units

### Input
- road = "CCC.G...R..."
- n = 16

### Result

[

  "CCC.G...R...", // 0 initial state as passed
  
  ".CCCG...R...", // 1
  
  "..CCC...R...", // 2 show 1st car, not the green light
  
  "..CCGC..R...", // 3 2nd car cannot enter intersection because 1st car blocks the exit
  
  "...CC.C.R...", // 4 show 2nd car, not the green light
  
  "...COC.CG...", // 5 3rd car stops for the orange light
  
  "...CR.C.C...", // 6
  
  "...CR..CGC..", // 7
  
  "...CR...C.C.", // 8
  
  "...CR...GC.C", // 9
  
  "...CR...O.C.", // 10
  
  "....C...R..C", // 11 3rd car can proceed
  
  "....GC..R...", // 12
  
  "....G.C.R...", // 13
  
  "....G..CR...", // 14
  
  "....G..CR...", // 15
  
  "....O...C..."  // 16
  
]
