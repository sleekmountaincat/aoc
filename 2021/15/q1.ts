import fs from 'fs';
import {PriorityQueue} from "./common";

const graph: number[][] = fs.readFileSync('2021/15/input.txt')
    .toString()
    .split("\n")
    .map(l => [...l.match(/[0-9]/g)!].map(n => +n))

function calculateShortestPath(graph: number[][], x: number, y: number) {
    const pq = new PriorityQueue();

    const visited = graph.map(g => g.map(j => false))
    const distance = graph.map(g => g.map(j => Number.POSITIVE_INFINITY))

    const directions = [[0, 1], [1, 0], [-1, 0], [0, -1]]

    let r = graph.length
    let c = graph[0].length

    let v = r * c
    let vVisited = 0

    distance[x][y] = 0

    pq.enqueue({distFromStart: distance[x][y], row: x, col: y}, distance[x][y])

    while (vVisited < v) {
        const {distFromStart, row, col} = pq.dequeue()

        for (const direction of directions) {
            const newRow = row + direction[0]
            const newCol = col + direction[1]

            if ((newRow > -1 && newRow < r) && (newCol > -1 && newCol < c) && !visited[newRow][newCol]) {
                const distNewPoint = distFromStart + graph[newRow][newCol]
                if (distNewPoint < distance[newRow][newCol]) {
                    distance[newRow][newCol] = distNewPoint
                    pq.enqueue({distFromStart: distNewPoint, row: newRow, col: newCol}, distNewPoint)
                }
            }
        }
        visited[row][col] = true
        vVisited++
    }

    return distance
}

const d = calculateShortestPath(graph, 0, 0)

console.log(d[graph.length-1][graph[0].length-1])