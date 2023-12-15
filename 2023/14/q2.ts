import fs from 'fs'

let thingy = fs.readFileSync('2023/14/input.txt')
    .toString()
    .split("\n")
    .map(n => n.split(""))
    .filter(Boolean)

const findHomeUp = (row: number, col: number): number => {
    for (let r = row - 1; r >= 0; r--) {
        if (["#", "O"].includes(thingy[r][col])) return r + 1
    }
    return 0
}

const findHomeLeft = (row: number, col: number): number => {
    for (let c = col - 1; c >= 0; c--) {
        if (["#", "O"].includes(thingy[row][c])) return c + 1
    }
    return 0
}

const findHomeDown = (row: number, col: number): number => {
    for (let r = row + 1; r < thingy.length; r++) {
        if (["#", "O"].includes(thingy[r][col])) return r - 1
    }
    return thingy.length - 1
}

const findHomeRight = (row: number, col: number): number => {
    for (let c = col + 1; c < thingy[0].length; c++) {
        if (["#", "O"].includes(thingy[row][c])) return c - 1
    }
    return thingy.length - 1
}

const tiltNorth = () => {
    for (let x = 1; x < thingy.length; x++) {
        for (let y = 0; y < thingy[0].length; y++) {
            if (thingy[x][y] === "O" && thingy[x - 1][y] === ".") {
                thingy[findHomeUp(x, y)][y] = "O"
                thingy[x][y] = "."
            }
        }
    }
}

const tiltSouth = () => {
    for (let x = thingy.length - 2; x >= 0; x--) {
        for (let y = 0; y < thingy[0].length; y++) {
            if (thingy[x][y] === "O" && thingy[x + 1][y] === ".") {
                thingy[findHomeDown(x, y)][y] = "O"
                thingy[x][y] = "."
            }
        }
    }
}

const tiltEast = () => {
    for (let x = 0; x < thingy.length; x++) {
        for (let y = thingy[0].length - 2; y >= 0; y--) {
            if (thingy[x][y] === "O" && thingy[x][y + 1] === ".") {
                thingy[x][findHomeRight(x, y)] = "O"
                thingy[x][y] = "."
            }
        }
    }
}

const tiltWest = () => {
    for (let x = 0; x < thingy.length; x++) {
        for (let y = 1; y < thingy[0].length; y++) {
            if (thingy[x][y] === "O" && thingy[x][y - 1] === ".") {
                thingy[x][findHomeLeft(x, y)] = "O"
                thingy[x][y] = "."
            }
        }
    }
}

const getLoad = (): number => {
    let sum = 0

    for (let x = 0; x < thingy.length; x++) {
        for (let y = 0; y < thingy[0].length; y++) {
            if (thingy[x][y] === "O") sum += thingy.length - x
        }
    }
    return sum
}

const cycle = () => {
    tiltNorth()
    tiltWest()
    tiltSouth()
    tiltEast()
}

let cycleStart = 0

let thingyValues: Set<string> = new Set()

do {
    cycle()
    cycleStart++

    let a = JSON.stringify(thingy)
    if (thingyValues.has(a)) break
    else thingyValues.add(a)
} while (true)

console.log(`cycle start at ${cycleStart}`)

thingyValues.clear()

thingyValues.add(JSON.stringify(thingy))
let cycleLength = 0
do {
    cycle()
    cycleLength++

    let a = JSON.stringify(thingy)
    if (thingyValues.has(a)) break
    else thingyValues.add(a)
} while (true)

console.log(`cycle length ${cycleLength}`)

// only do the amount of cycles we need to be equivalent to 1000000000
// we know there is a repeating cycle of the map state, and we know when it starts
// and the period, so we only have to do a few cycles (making sure we account for the
// ones we already did while deriving those values above

let equivAmountCycles = (1000000000 - (cycleLength + cycleStart)) % cycleLength
for (let x = 0; x < equivAmountCycles; x++) {
    cycle()
}

console.log(getLoad())

