import nReadlines from 'n-readlines';

const lines = new nReadlines('2023/1/q1input.txt');

let line;
let sum = 0;

while (line = lines.next()) {
    sum += parseInt(getNumber(line.toString()) + getNumber(line.toString(), false))
}

console.log(sum)

function getNumber(line: string, fromStart: boolean = true): string {
    for(let x= 0; x < line.length; x++) {
        let maybeNumber  = fromStart ? replaceWordNumbers(line.slice(0, x+1)).match(/[0-9]/g) : replaceWordNumbers(line.slice((x+1)*-1)).match(/[0-9]/g)
        if (maybeNumber?.length) {
            return maybeNumber.pop() as string
        }
    }

    console.log("Oh no")
    process.exit(1)
}

function replaceWordNumbers(line: string): string {
    return line
        .replace(/one/g, "1")
        .replace(/two/g, "2")
        .replace(/three/g, "3")
        .replace(/four/g, "4")
        .replace(/five/g, "5")
        .replace(/six/g, "6")
        .replace(/seven/g, "7")
        .replace(/eight/g, "8")
        .replace(/nine/g, "9")
}
