import fs from 'fs';

const input = fs.readFileSync('2023/6/input.txt').toString().split("\n");
const maxTime = [...input.shift()!.replace(/[\s]+/g, "").matchAll(/[0-9]+/g)!].map(s => parseInt(s[0]))
const minDist = [...input.shift()!.replace(/[\s]+/g, "").matchAll(/[0-9]+/g)!].map(s => parseInt(s[0]))


let winCount = 0

for (let x = 0; x < maxTime[0]; x++) {
    if (((maxTime[0] - x) * x) > minDist[0]) winCount++
}

console.log(winCount)
