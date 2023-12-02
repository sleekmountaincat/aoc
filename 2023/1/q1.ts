import nReadlines from 'n-readlines';

const lines = new nReadlines('2023/1/input.txt');

let line;
let sum = 0;
while (line = lines.next()) {
    let parsedLine = line.toString().match(/[0-9]/g)!.join('')
    sum += parseInt(parsedLine[0] + parsedLine.slice(-1))
}

console.log(sum)
