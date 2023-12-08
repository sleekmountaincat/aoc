import fs from 'fs';

interface MapPoint {
    L: string
    R: string
}

const input = fs.readFileSync('2023/8/input.txt').toString().split("\n");

const konamiCode = input.shift()!.trim()
input.shift()

let desertMap: Map<string, MapPoint> = new Map()
input.forEach(i => {
    let [loc, L, R] = [...i.match(/[A-Z]+/g)!]
    desertMap.set(loc, {L, R})
})

// let currentPoint = desertMap.entries().next().value[1][konamiCode[0]];
let currentPoint = konamiCode[0] === "L" ? desertMap.get("AAA")!.L : desertMap.get("AAA")!.R
let steps = 1

do {
    // let xs = konamiCode[steps % konamiCode.length]
    // console.log(konamiCode[steps % konamiCode.length])
    let dest = desertMap.get(currentPoint)!
    currentPoint = konamiCode[steps % konamiCode.length] === "L" ? dest.L : dest.R
    steps++
} while (currentPoint != "ZZZ")

console.log(steps)

// let desert


// LLR
//
// AAA = (BBB, BBB)
// BBB = (AAA, ZZZ)
// ZZZ = (ZZZ, ZZZ)