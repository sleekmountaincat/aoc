import {findCandidatePartNumbers, isSymbolAdjacent, parseInput, PartNumber} from "./helpers";

let partNumbers: PartNumber[] = []

let engine: string[] = parseInput('2023/3/input.txt')
let maybePartNumbers: PartNumber[] = findCandidatePartNumbers(engine)

maybePartNumbers.forEach(maybePartNumber => {
    if (isSymbolAdjacent(engine, maybePartNumber)) partNumbers.push(maybePartNumber)
})

let sumOfPartNumbers = partNumbers.reduce(
    (acc, cur) => {
        return acc + (cur.value)
    },
    0,
)

console.log(sumOfPartNumbers)




