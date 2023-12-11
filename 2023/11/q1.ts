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

const expandedUniverse = universe.map(l => l.slice())
const galaxies: Galaxy[] = []
let colOffset = 0
let rowOffset = 0

for (let y = 0; y < universe[0].length; y++) {
    let shouldExpand = true
    for (let x = 0; x < universe.length; x++) {
        if (universe[x][y] === "#") shouldExpand = false
    }
    if (shouldExpand) {
        console.log("expanding col", y + colOffset)
        for (let z = 0; z < universe.length; z++) {
            expandedUniverse[z].splice(y + colOffset, 0, ".")
        }
        colOffset++
    }
}

for (let x = 0; x < universe.length; x++) {
    let shouldExpand = true
    for (let y = 0; y < universe[0].length; y++) {
        if (universe[x][y] === "#") shouldExpand = false
    }
    if (shouldExpand) {
        console.log("expanding row", x)
        expandedUniverse.splice(x + rowOffset, 0, Array(expandedUniverse[0].length).fill("."))
        rowOffset++
    }
}

let n = 0
for (let x = 0; x < expandedUniverse.length; x++) {
    for (let y = 0; y < expandedUniverse[0].length; y++) {
        if (expandedUniverse[x][y] === "#") galaxies[n] = {x, y, n: n++}
    }
}

const pairs = galaxies.flatMap((g1, i) => galaxies.slice(i+1).map( g2 => { return {g1, g2}} ))

console.log(`found ${pairs.length} pairs of galaxies`)

let sum = 0
pairs.forEach(p => {
    const distance = Math.abs(p.g1.x - p.g2.x) + Math.abs(p.g1.y - p.g2.y)
    sum += distance
})

console.log(`sum of all shortest distances: ${sum}`)

