import fs from 'fs'

let memoizeTable: Map<string, number> = new Map()

const getArrangements = (puzzle: string, key: number[], idx: number, keyIdx: number, springCnt: number): number => {
    const hashKey = idx.toString() + "-" + keyIdx.toString() + "-" + springCnt.toString()

    // have we already seen and calculated answer for this combo of place in string, place in key, and count of springs?
    // if so return
    if (memoizeTable.has(hashKey)) return memoizeTable.get(hashKey)!

    if (idx >= puzzle.length) {
        // we have reached the end of a puzzle string. its valid if:
        // we have processed all keys, and we are not in the middle of a run of springs
        // OR we are on the last key group and it matches our current run of springs
        if ((keyIdx >= key.length && !springCnt) || (keyIdx + 1 == key.length && springCnt == key[keyIdx])) {
            memoizeTable.set(hashKey, 1)
            return 1
        } else {
            memoizeTable.set(hashKey, 0)
            return 0
        }
    }

    let total = 0

    // my big bug, DO NOT expand all values of ?, just treat a '?' as both cases in our logic
    if (puzzle[idx] == "." || puzzle[idx] == "?") {
        if (!springCnt) {
            // if we hit a '.' and we are not in a run of springs, just continue scanning the current string
            total += getArrangements(puzzle, key, idx + 1, keyIdx, 0)
        } else if (springCnt && springCnt === key[keyIdx]) {
            // if we are in a run of springs and we hit a '.', AND our current run of springs satisfies our current key,
            // then continue scanning the string but bump our key to the next one
            total += getArrangements(puzzle, key, idx + 1, keyIdx + 1, 0)
        }
    }

    if (puzzle[idx] == "#" || puzzle[idx] == "?") {
        // if we hit a '#', we either start or continue a run of springs and continue scanning the current puzzle string
        total += getArrangements(puzzle, key, idx + 1, keyIdx, springCnt + 1)
    }

    // if none of the above is true, we have concluded this branch of the original puzzle string
    memoizeTable.set(hashKey, total)
    return total
}

console.log(fs.readFileSync('2023/12/input.txt')
    .toString()
    .split("\n")
    .map((l, idx) => {
        let [puzzle, keyStr] = l.split(" ")
        let key = keyStr.split(",").map(n => +n)

        puzzle = [puzzle, puzzle, puzzle, puzzle, puzzle].join("?")
        key = key.concat(key).concat(key).concat(key).concat(key)

        memoizeTable.clear()

        return getArrangements(puzzle, key, 0, 0, 0)
    }).reduce((a,c) => a+c))


