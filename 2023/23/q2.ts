import fs from "fs";

const map = fs.readFileSync('2023/23/input.txt')
    .toString()
    .split("\n")
    .map(l => l.split("").map(n => n))

const R = map.length
const C = map[0].length

const start = [0, map[0].indexOf(".")]
const end = [R - 1, map[R - 1].indexOf(".")]

let maxSteps = 0
const key = (x: number, y: number) => `${x},${y}`

const walk = (x: number, y: number, visited: Set<string>) => {
    let validPath = true

    while (!(x == end[0] && y == end[1])) {
        visited.add(key(x, y))

        const dirs: number[][] = []
        if (y > 0 && map[x][y - 1] != "#" && !visited.has(key(x, y - 1))) dirs.push([x, y - 1])
        if (y < C && map[x][y + 1] != "#" && !visited.has(key(x, y + 1))) dirs.push([x, y + 1])
        if (x > 0 && map[x - 1][y] != "#" && !visited.has(key(x - 1, y))) dirs.push([x - 1, y])
        if (x < R && map[x + 1][y] != "#" && !visited.has(key(x + 1, y))) dirs.push([x + 1, y])

        if (dirs.length == 0) {
            validPath = false
            break
        }

        [x, y] = dirs.pop()!

        dirs.forEach(d => {
            walk(d[0], d[1], new Set(visited))
        })

    }

    if (validPath && visited.size > maxSteps) {
        maxSteps = visited.size
        console.log(maxSteps)
    }
}

walk(start[0], start[1], new Set())

console.log(maxSteps)
// 6410