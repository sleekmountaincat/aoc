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

let locations = seeds.map(seed => {
    return maps.reduce((a,c) => {
        return c.getOutput(a) ?? a
    }, seed)
})

console.log(Math.min(...locations))