import fs from 'fs'

const thingy = fs.readFileSync('2023/14/input.txt')
    .toString()
    .split("\n")
    .map(n => n.split(""))
    .filter(Boolean)

let moved = false
let sum = 0

do {
    moved = false
    for (let x = 1; x < thingy.length; x++) {
        for (let y = 0; y < thingy[0].length; y++) {
            if (thingy[x][y] === "O" && thingy[x - 1][y] === ".") {
                thingy[x][y] = "."
                thingy[x - 1][y] = "O"
                moved = true
            }
        }
    }
} while (moved)

for (let x = 0; x < thingy.length; x++) {
    for (let y = 0; y < thingy[0].length; y++) {
        if (thingy[x][y] === "O") sum += thingy.length - x
    }
}

console.log(sum)
