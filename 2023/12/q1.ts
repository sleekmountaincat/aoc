import fs from 'fs'

const combos: number[] = []

// um maybe i am dumb but there is not an easy way to replace a char in a string?????
function replace(str: string, c: string, idx: number) {
    let n = str.split("");
    n[idx] = c;
    return n.join("");
}

const getArrangements = (puzzle: string, key: number[], idx: number, keyIdx: number, springCnt: number): number => {
    if (idx >= puzzle.length) {
        // we have reached the end of a fully expanded puzzle string. its valid if:
        // we have processed all keys, and we are not in the middle of a run of springs
        // OR we are on the last key group and it matches our current run of springs
        return ((keyIdx >= key.length && !springCnt) || (keyIdx + 1 == key.length && springCnt == key[keyIdx])) ? 1 : 0
    }

    // expand out all possible values of ?
    if (puzzle[idx] === "?") return getArrangements(replace(puzzle, ".", idx), key, idx, keyIdx, springCnt) +
        getArrangements(replace(puzzle, "#", idx), key, idx, keyIdx, springCnt)

    if (puzzle[idx] == ".") {
        if (!springCnt) {
            // if we hit a '.' and we are not in a run of springs, just continue scanning the current string
            return getArrangements(puzzle, key, idx + 1, keyIdx, 0)
        } else if (springCnt && springCnt === key[keyIdx]) {
            // if we are in a run of springs and we hit a '.', AND our current run of springs satisfies our current key,
            // then continue scanning the string but bump our key to the next one
            return getArrangements(puzzle, key, idx + 1, keyIdx + 1, 0)
        }

        // if we hit a '.' but neither of the above is true, this current puzzle string is invalid
        else return 0

    }

    if (puzzle[idx] == "#") {
        // if we hit a '#', we either start or continue a run of springs and continue scanning the current puzzle string
        return getArrangements(puzzle, key, idx + 1, keyIdx, springCnt + 1)
    }

    // should not ever hit this
    console.log("BIG BAD PROLLEM WE SHOULDNT GET HERE")
    process.exit(1)
}

console.log(fs.readFileSync('2023/12/input.txt')
    .toString()
    .split("\n")
    .map(l => {
        let numCombos = 0
        const [puzzle, keyStr] = l.split(" ")
        const key = keyStr.split(",").map(n => +n)

        return getArrangements(puzzle, key, 0, 0, 0)
    }).reduce((a,c) => a+c))


