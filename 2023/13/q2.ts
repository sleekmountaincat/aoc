import fs from 'fs'

interface Field {
    mirrors: string[][]
}

const fields: Field[] = []

fields.push({mirrors: []})

let cnt = 0

fs.readFileSync('2023/13/input.txt')
    .toString()
    .split("\n")
    .forEach(f => {
        if (f == "") fields[++cnt] = {mirrors: []}
        else fields[cnt].mirrors.push(f.toString().split(""))
    })

function checkVert(a: string[][], r: number, offset: number): boolean {
    for (let x = 0; x < offset; x++) {
        for (let y = 0; y < a.length; y++) {
            if (a[y][r - x] != a[y][r + x + 1]) return false
        }
    }
    return true
}

function findVerticalReflection(a: string[][]): number[] {
    let refl: number[] = []

    for (let x = 0; x < a[0].length - 1; x++) {
        let offset = x >= (Math.floor(a[0].length / 2)) ? a[0].length - x - 1 : x + 1

        if (checkVert(a, x, offset)) refl.push(x + 1)
    }

    return refl
}

function checkHoriz(a: string[][], r: number, offset: number): boolean {
    for (let x = 0; x < offset; x++) {
        for (let y = 0; y < a[0].length; y++) {
            if (a[r - x][y] != a[r + x + 1][y]) return false
        }
    }
    return true
}

function findHorizontalReflection(a: string[][]) {
    let refl: number[] = []

    for (let x = 0; x < a.length - 1; x++) {
        let offset = x >= (Math.floor(a.length / 2)) ? a.length - x - 1 : x + 1

        if (checkHoriz(a, x, offset)) refl.push(x + 1)
    }

    return refl
}

const sum = fields.reduce((a,c) => {
    let oldH = findHorizontalReflection(c.mirrors)[0] ?? 0
    let oldV = findVerticalReflection(c.mirrors)[0] ?? 0

    for (let x = 0; x < c.mirrors.length; x++) {
        for (let y = 0; y < c.mirrors[0].length; y++) {
            c.mirrors[x][y] = c.mirrors[x][y] == "#" ? "." : "#"

            let newH = findHorizontalReflection(c.mirrors)
            let newV = findVerticalReflection(c.mirrors)

            newH = newH.filter(n => n != oldH)
            newV = newV.filter(n => n != oldV)

            if (newH.length || newV.length) {
                if (newH.length) {
                    return a + 100 * newH[0]
                } else if (newV.length) {
                    return a + newV[0]
                }
            } else {
                c.mirrors[x][y] = c.mirrors[x][y] == "#" ? "." : "#"
            }
        }
    }
    process.exit(1)
}, 0)

console.log(sum)
