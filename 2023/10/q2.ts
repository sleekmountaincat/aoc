import fs from 'fs';

const map: string[][] = []
let start = [0, 0]

fs.readFileSync('2023/10/input.txt')
    .toString()
    .split("\n")
    .forEach((l, x) => {
        map.push([])

        for (let y = 0; y < l.length; y++) {
            map[x].push(l[y])
            if (l[y] === "S") {
                start[0] = x
                start[1] = y
            }
        }
    })

let pos = start.slice()
let r = map.length
let c = map[0].length
let up = ["|", "7", "F"]
let down = ["|", "L", "J"]
let left = ["-", "F", "L"]
let right = ["-", "7", "J"]
let prev;
let loopPoints: string[][] = map.map(r => r.map(c => ""))

loopPoints[pos[0]][pos[1]] = "S"

if (pos[0] > 0 && up.includes(map[pos[0] - 1][pos[1]])) {
    pos[0]--
    prev = "D"
} else if (pos[0] + 1 < r && down.includes(map[pos[0] + 1][pos[1]])) {
    pos[0]++
    prev = "U"
} else if (pos[1] > 0 && left.includes(map[pos[0]][pos[1] - 1])) {
    pos[1]--
    prev = "R"
} else if (pos[1] + 1 < c && right.includes(map[pos[0]][pos[1] + 1])) {
    pos[1]++
    prev = "L"
} else {
    console.log(`stuck at start: ${map[pos[0]][pos[1]]} = ${pos[0]},${pos[1]}`)
    process.exit(1)
}

do {
    loopPoints[pos[0]][pos[1]] = map[pos[0]][pos[1]]

    switch (map[pos[0]][pos[1]]) {
        case "|":
            if (prev === "D") {
                pos[0]--
            } else {
                pos[0]++
                prev = "U"
            }
            break
        case "7":
            if (prev === "D") {
                pos[1]--
                prev = "R"
            } else {
                prev = "U"
                pos[0]++
            }
            break
        case "F":
            if (prev === "D") {
                pos[1]++
                prev = "L"
            } else {
                pos[0]++
                prev = "U"
            }
            break
        case "L":
            if (prev === "U") {
                pos[1]++
                prev = "L"
            } else {
                pos[0]--
                prev = "D"
            }
            break
        case "J":
            if (prev === "U") {
                pos[1]--
                prev = "R"
            } else {
                prev = "D"
                pos[0]--
            }
            break
        case "-":
            if (prev === "L") {
                pos[1]++
            } else {
                pos[1]--
                prev = "R"
            }
            break
    }
    console.log(`at: ${pos[0]},${pos[1]} = ${map[pos[0]][pos[1]]}`)
} while (map[pos[0]][pos[1]] != "S")

let countEnclosed = 0
for (let x = 0; x < r; x++) {
    for (let y = 0; y < c; y++) {
        let intersectCount = 0

        if (loopPoints[x][y] == "" && (y+1 < c)) {
            for (let z = y+1; z < c; z++) {
                // either include or exclude "S" to count as barrier, need to replace it with correct tile based on exit and enter
                intersectCount += ["|","7","F"].includes(loopPoints[x][z]) ? 1 : 0
            }
        }

        if (intersectCount % 2) {
            countEnclosed++
            loopPoints[x][y] = "X"
        }
    }
}

console.log(countEnclosed)
