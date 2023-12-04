import {importScratchersFromFile, Scratcher} from "./common";

let allScratchers: Scratcher[] = importScratchersFromFile('2023/4/input.txt')

let numCards: number[] = []

allScratchers.forEach(s=> {
    numCards[s.id] = 1
})

allScratchers.forEach(s => {
    for (let x = 1; x <= s.winners; x++) {
        numCards[s.id + x] += numCards[s.id]
    }
})

console.log(numCards.reduce((a,c) => a+c))
