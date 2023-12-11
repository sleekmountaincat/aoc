import fs from 'fs'

interface Galaxy {
    x: number
    y: number
    n: number
}

const universe: string[][] = fs.readFileSync('2023/11/input.txt')
    .toString()
    .split("\n")
    .map(l => l.split(""))

const galaxies: Galaxy[] = []
const expandedCols: number[] = []
const expandedRows: number[] = []

const expansionFactor = 1000000

for (let y = 0; y < universe[0].length; y++) {
    let shouldExpand = true
    for (let x = 0; x < universe.length; x++) {
        if (universe[x][y] === "#") shouldExpand = false
    }
    if (shouldExpand) expandedCols.push(y)
}

for (let x = 0; x < universe.length; x++) {
    if (universe[x].every(c => c === ".")) expandedRows.push(x)
}

let n = 0
for (let x = 0; x < universe.length; x++) {
    for (let y = 0; y < universe[0].length; y++) {
        if (universe[x][y] === "#") galaxies[n] = {x, y, n: n++}
    }
}

const pairs = galaxies.flatMap((g1, i) => galaxies.slice(i+1).map( g2 => { return {g1, g2}} ))

console.log(`found ${pairs.length} pairs of galaxies`)

let sum = 0

pairs.forEach(p => {
    const rowExpansionCount = expandedRows.reduce((a, c) => {
        return c > Math.min(p.g1.x, p.g2.x) && c < Math.max(p.g1.x, p.g2.x) ? a + 1 : a
    },0)

    const colExpansionCount = expandedCols.reduce((a, c) => {
        return c > Math.min(p.g1.y, p.g2.y) && c < Math.max(p.g1.y, p.g2.y) ? a + 1 : a
    },0)


    const distance = Math.abs(p.g1.x - p.g2.x) + (expansionFactor * rowExpansionCount) + Math.abs(p.g1.y - p.g2.y) + (expansionFactor * colExpansionCount) - rowExpansionCount - colExpansionCount
    sum += distance
})

console.log(`sum of all shortest distances: ${sum}`)

