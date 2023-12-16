import fs from "fs";

const map = fs.readFileSync('2023/16/input.txt')
    .toString()
    .split("\n")
    .map(l => l.split(""))

const r = map.length
const c = map[0].length

const visited = map.map(g => g.map(j => ""))

const runMap = (x: number, y: number, d: string) => {
    if (x >= r || x < 0 || y >= c || y < 0) return
    if (visited[x][y].includes(d)) return

    visited[x][y] += d

    const t = map[x][y]

    if (t == "|" && ["r", "l"].includes(d)) {
        runMap(--x, y, "u")
        runMap(++x, y, "d")
    } else if (t == "-" && ["u", "d"].includes(d)) {
        runMap(x, ++y, "r")
        runMap(x, --y, "l")
    } else if ((t == "/" && d == "r") || (t == "\\" && d == "l")) {
        runMap(--x, y, "u")
    } else if ((t == "/" && d == "l") || (t == "\\" && d == "r")) {
        runMap(++x, y, "d")
    } else if ((t == "/" && d == "u") || (t == "\\" && d == "d")) {
        runMap(x, ++y, "r")
    } else if ((t == "/" && d == "d") || (t == "\\" && d == "u")) {
        runMap(x, --y, "l")
    } else if (d == "u") {
        runMap(--x, y, d)
    } else if (d == "d") {
        runMap(++x, y, d)
    } else if (d == "l") {
        runMap(x, --y, d)
    } else if (d == "r") {
        runMap(x, ++y, d)
    }
}

runMap(0, 0, "r")

let sum = visited
    .flatMap(d => d)
    .reduce((a, c) => a + (c.length ? 1 : 0), 0)

console.table(sum)

