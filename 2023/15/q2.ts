import fs from 'fs'

const boxes: Map<string, number>[] = []

const hashA = (s: string): number => {
    let ans = 0

    s.split("").forEach(c => {
        ans += c.charCodeAt(0)
        ans *= 17
        ans %= 256
    })

    return ans
}

fs.readFileSync('2023/15/input.txt')
    .toString()
    .split(",")
    .forEach(s => {
        let lensLabel = s.match(/[a-z]+/)![0]
        let boxIdx = hashA(lensLabel)
        let focalVal = +s.match(/[0-9]+/)! ? +s.match(/[0-9]+/)![0] : 0

        if (s.includes("=")) {
            if (!boxes[boxIdx]) boxes[boxIdx] = new Map()
            boxes[boxIdx].set(lensLabel, focalVal)
        } else {
            if (boxes[boxIdx] && boxes[boxIdx].has(lensLabel)) boxes[boxIdx].delete(lensLabel)
        }
    })

let ans = boxes.reduce((a, c, i) => {
    if (c && c.size) {
        let lensMultiplier = 0
        let cnt = 1
        let total = 0

        c.forEach((l, idx) => {
            total += (1 + i) * l * cnt++
        })

        return a + total
    } else
        return a
}, 0)

console.log(ans)
