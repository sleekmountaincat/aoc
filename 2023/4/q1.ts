import {importScratchersFromFile} from "./common";

let scratchers = importScratchersFromFile('2023/4/input.txt')

console.log(scratchers.reduce((acc, cur) => acc + cur.score, 0))