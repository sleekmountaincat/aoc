import fs from 'fs';

let x = 0
let y = 0

fs.readFileSync('2021/2/input.txt')
    .toString()
    .split("\n")
    .forEach(i => {
        let [dir, val] = i.split(" ")

        switch (dir) {
            case "forward": x += parseInt(val)
                break
            case "up": y -= parseInt(val)
                break
            default: y += parseInt(val)
                break
        }
    })


console.log(x * y)