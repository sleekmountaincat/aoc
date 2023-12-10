import fs from 'fs';

const pings: number[] = fs.readFileSync('2021/1/input.txt')
    .toString()
    .split("\n")
    .map(n => +n)

let inc: number = 0

for(let i = 0; i < pings.length; i++) {
    if (i > 0 && pings[i] > pings[i-1]) inc++
}

console.log(inc)