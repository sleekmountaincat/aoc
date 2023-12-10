import fs from 'fs';

let x = 0
let y = 0
let a = 0

fs.readFileSync('2021/2/input.txt')
    .toString()
    .split("\n")
    .forEach(i => {
        let [dir, val] = i.split(" ")

        switch (dir) {
            case "forward":
                x += parseInt(val)
                y += a*parseInt(val)
                break
            case "up": a -= parseInt(val)
                break
            default: a += parseInt(val)
                break
        }
    })

console.log(x * y)
