import fs from "fs";
import {Heap} from 'heap-js';

// our nodes, the state for the graph traversal is NOT just x and y, you also have to include the direction
// travelled to get there, AND how many moves since you turned. this is confusing as heck, but this image
// reallllly really helped me understand it: https://imgur.com/a/DQ0DMqi
// also see this reddit thread: https://www.reddit.com/r/adventofcode/comments/18kv33i/2013_day_17_part_1_i_do_not_understand_how_to/

type Node = {
    x: number         // position
    y: number         // position
    dir: string       // direction we were going when we got here
    sinceTurn: number // direction we were going when we got here
    g: number         // for A*, total cost to arrive here from the start
    h: number         // for A*, this is our heuristic and is an estimation of cost from this node to the end, just manhattan for now
    f: number         // for A*, this is g+h and is used to determine the best candidate to evaluate next thanks to our min heap
    parent?: Node     // node we got here from
}

const costs = fs.readFileSync('2023/17/input.txt')
    .toString()
    .split("\n")
    .map(l => l.split("").map(n => +n))

const ROW = costs.length
const COL = costs[0].length

const U = [-1, 0]
const D = [1, 0]
const L = [0, -1]
const R = [0, 1]

// return direction we travelled between 2 pts
const getDir = (x1: number, y1: number, x2: number, y2: number): string => {
    if (x1 < x2) return "D"
    if (x1 > x2) return "U"
    if (y1 < y2) return "R"
    else return "L"
}

// QOL helper function to build a node
const buildNode = (x: number, y: number, dir: string, sinceTurn: number, g: number, h: number, f: number, parent: Node | undefined = undefined): Node => {
    return {
        x, y, dir, sinceTurn, g, h, f, parent
    }
}

const moveThatDangLava = (endX: number, endY: number): Node[] => {
    // minimum heap, used to store our candidate nodes sorted by best guess
    const heap = new Heap((a: Node, b: Node) => a.f - b.f)

    // our starting nodes, only valid ones are right, and down from 0,0
    heap.push(buildNode(0, 1, "R", 1, costs[0][1], 0, costs[0][1]))
    heap.push(buildNode(1, 0, "D", 1, costs[1][0], 0, costs[1][0]))

    // keep track of which nodes we have been to, or rather which STATES of the graph traversal
    const visited: Map<string, number> = new Map()

    // the meat of the pathfinding, A* algorithm
    while (!heap.isEmpty()) {
        // start looking at the best candidate we know of, thanks to min heap and heuristic
        let cur = heap.pop()!

        // if we have found the end AND we got there by moving in a straight line 4, rejoice
        // also construct the path we travelled to get here
        if (cur.x == endX && cur.y == endY && cur.sinceTurn >= 4) {
            let path: Node[] = []

            while (cur.parent) {
                path.push(cur)
                cur = cur.parent
            }

            return path.reverse()
        }

        // this could be done way better i think, but meh
        let directions: number[][] = []

        // if we have been going same direction for 10 moves, must go 90 degrees
        if (cur.sinceTurn >= 10) {
            if (["R", "L"].includes(cur.dir)) {
                directions.push(U)
                directions.push(D)
            } else {
                directions.push(L)
                directions.push(R)
            }
        } else {
            // must go at least 4 moves before turning
            if (cur.dir == "R") {
                directions.push(R)
                if (cur.sinceTurn >= 4) {
                    directions.push(U)
                    directions.push(D)
                }
            } else if (cur.dir == "L") {
                directions.push(L)
                if (cur.sinceTurn >= 4) {
                    directions.push(U)
                    directions.push(D)
                }
            } else if (cur.dir == "U") {
                directions.push(U)
                if (cur.sinceTurn >= 4) {
                    directions.push(L)
                    directions.push(R)
                }
            } else if (cur.dir == "D") {
                directions.push(D)
                if (cur.sinceTurn >= 4) {
                    directions.push(L)
                    directions.push(R)
                }
            }
        }

        for (let nextD of directions) {
            // our next candidate, we need to build the node to represent it
            const x = cur.x + nextD[0]
            const y = cur.y + nextD[1]

            // out of bounds, ignore
            if (!costs[x] || !costs[x][y]) continue

            // calculate stuff about this node
            const dir = getDir(cur.x, cur.y, x, y)
            const sinceTurn = cur.dir == dir ? cur.sinceTurn + 1 : 1

            // unique key for our node, our state space
            const key = `${x}-${y}-${dir}-${sinceTurn}`

            // total cost to get here
            const g = cur.g + costs[x][y]

            // if we havent been here, add to heap to possibly visit
            // OR if we have been here, but the way we got here this time was cheaper, add to heap to visit
            if (!visited.has(key) || (visited.has(key) && g < visited.get(key)!)) {
                visited.set(key, g)

                // estimate the distance to end based on manhattan formula so that
                // best candidates are examined first
                const h = ((Math.abs(x - endX)) + (Math.abs(y - endY)))

                // add to heap
                heap.push(buildNode(x, y, dir, sinceTurn, g, h, g + h, cur))
            }
        }
    }

    return []
}

let v = moveThatDangLava(ROW - 1, COL - 1)
const vis = costs.map(g => g.map(j => "."))

v.forEach(x => {
    if (x.dir == "U") vis[x.x][x.y] = "^"
    if (x.dir == "L") vis[x.x][x.y] = "<"
    if (x.dir == "R") vis[x.x][x.y] = ">"
    if (x.dir == "D") vis[x.x][x.y] = "v"
})

for (let x = 0; x < vis.length; x++) {
    for (let y = 0; y < vis[0].length; y++) {
        process.stdout.write(vis[x][y])
    }
    console.log()
}

// g value for the last node in our list will have the total cost from 0,0
console.log(v[v.length - 1].g)
