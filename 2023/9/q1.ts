import fs from 'fs';

let input: number[][] = fs.readFileSync('2023/9/input.txt')
    .toString()
    .split("\n")
    .map(l => [...l.match(/[0-9-]+/g)!].map(n => +n))

const adif = (seq: number[]): number[] => {
    let dif: number[] = []
    for (let x = 0; x < seq.length; x++) if (x+1 < seq.length) dif.push(seq[x+1] - seq[x])
    return dif
}

const addem = (seq: number[]): number => seq.reduce((a, c) => a+c)

let sum = addem(input.map(seq => {
    let last: number[] = []

    do {
        last.push((seq[seq.length-1]))
        seq = adif(seq)
    } while (!seq.every(n => n === 0))

    return addem(last)
}))

console.log(sum)
