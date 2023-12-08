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
    let [loc, L, R] = [...i.match(/[A-Z0-9]+/g)!]
    desertMap.set(loc, {L, R})
})

let startingPoints = [...desertMap.keys()].filter(m => m[2] === "A")

function getStepsForPoint(point: string): number {
    let currentPoint = konamiCode[0] === "L" ? desertMap.get(point)!.L : desertMap.get(point)!.R
    let steps = 1

    do {
        currentPoint = konamiCode[steps % konamiCode.length] === "L" ? desertMap.get(currentPoint)!.L : desertMap.get(currentPoint)!.R
        steps++
    } while (currentPoint[2] != "Z")

    return steps
}

let steps = startingPoints.map(s => getStepsForPoint(s))

//stole this from the internets
const gcd: (a: number, b: number) => number = (a: number, b: number) => a ? gcd(b % a, a) : b;
const lcm = (a: number, b: number) => a * b / gcd(a, b);

console.log(steps.reduce(lcm))