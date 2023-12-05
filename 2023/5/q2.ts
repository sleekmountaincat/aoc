import fs from 'fs';
import {AlmanacMap} from "./common";

const almanac = fs.readFileSync('2023/5/input.txt').toString().split("\n");
const seeds = [...almanac.shift()!.matchAll(/[0-9]+/g)!].map(s => parseInt(s[0]))

const maps: AlmanacMap[] = []

let numMaps = -1

for (let i in almanac) {
    if (almanac[i] == "") {
        numMaps++
        continue
    }

    if (almanac[i].includes("map")) {
        maps[numMaps] = new AlmanacMap()
        continue
    }

    const [destStart, sourceStart, length] = [...almanac[i].matchAll(/[0-9]+/g)!].map(s => parseInt(s[0]))

    maps[numMaps].addRange(destStart, sourceStart, length)
}

let lowest: number = Number.POSITIVE_INFINITY

for (let x = 0; x < seeds.length; x+=2) {
    console.log(`seed: ${seeds[x]}`)
    for(let y= seeds[x]; y < seeds[x]+seeds[x+1]; y++) {
        let loc = maps.reduce((a,c) => {
                // console.log(`seed: ${seed}, a: ${a}, c.get: ${c.get(a)}`)
                return c.getOutput(a) ?? a
            }, y)
        if (loc < lowest) lowest = loc
    }
}

console.log(lowest)