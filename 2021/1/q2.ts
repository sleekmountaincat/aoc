import fs from 'fs';

const pings: number[] = fs.readFileSync('2021/1/input.txt')
    .toString()
    .split("\n")
    .map(n => +n)

let inc: number = 0
let sums: number[] = []

for(let i = 0; i < pings.length - 2; i++) {
    sums.push(pings[i] + pings[i+1] + pings[i+2])
}

for(let i = 0; i < sums.length; i++) {
    if (i > 0 && sums[i] > sums[i-1]) inc++
}

console.log(inc)