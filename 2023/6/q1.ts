import fs from 'fs';

const input = fs.readFileSync('2023/6/input.txt').toString().split("\n");
const maxTime = [...input.shift()!.matchAll(/[0-9]+/g)!].map(s => parseInt(s[0]))
const minDist = [...input.shift()!.matchAll(/[0-9]+/g)!].map(s => parseInt(s[0]))

let count: number[] = []

for (let m = 0; m < maxTime.length; m++) {
    let winCount = 0
    for (let x = 0; x < maxTime[m]; x++) {
        if (((maxTime[m] - x) * x) > minDist[m]) winCount++
    }
    count.push(winCount)
}

count.reduce((a, c) => a * c!)

console.log(count.reduce((a, c) => a * c!))
