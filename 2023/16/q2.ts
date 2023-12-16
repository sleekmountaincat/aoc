import fs from "fs";

const map = fs.readFileSync('2023/16/input.txt')
    .toString()
    .split("\n")
    .map(l => l.split(""))

const r = map.length
const c = map[0].length

const shootBeam = (x: number, y: number, d: string): number => {
    let visited = map.map(g => g.map(j => ""))

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

    runMap(x, y, d)

    return visited.flatMap(d => d).reduce((a, c) => a + (c.length ? 1 : 0), 0)
}


let highest = 0

for (let x = 0; x < r; x++) {
    let s = shootBeam(x, 0, "r")
    if (s > highest) highest = s

    s = shootBeam(x, c - 1, "l")
    if (s > highest) highest = s
}

for (let y = 0; y < c; y++) {
    let s = shootBeam(0, y, "d")
    if (s > highest) highest = s

    s = shootBeam(r - 1, y, "u")
    if (s > highest) highest = s
}

console.log(highest)


