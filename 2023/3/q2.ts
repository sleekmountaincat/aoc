import {findCandidatePartNumbers, isSymbolAdjacent, parseInput} from "./helpers";

let engine: string[] = parseInput('2023/3/input.txt')
let partNumbers = findCandidatePartNumbers(engine)
    .map(partNumber => {
        if (isSymbolAdjacent(engine, partNumber)) return partNumber
    })
    .filter(Boolean)

let sumOfGearRatios = (partNumbers.reduce((acc, cur) => {
        let ratio = 0

        if (cur!.gearIndex) {
            let matches = partNumbers.filter(p => p!.gearIndex && p!.gearIndex == cur!.gearIndex)
            if (matches.length === 2) {
                ratio = matches.reduce((acc, cur) => {
                    return acc * cur!.value
                }, 1)
            }
        }
        return acc + ratio
    },
    0,
)) / 2

console.log(sumOfGearRatios)
