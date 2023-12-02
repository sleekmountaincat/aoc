import nReadlines from 'n-readlines';
import {BagDraw, CubeGame} from "./common";

const lines = new nReadlines('2023/2/input.txt');

let line;
let allGames: CubeGame[] = []

while (line = lines.next()) {
    let [game, draws] = line.toString().split(":")

    let gameId = game!.match(/[0-9]+/)!.pop()
    let bagDraws: BagDraw[] = parseBagDraws(draws)

    allGames.push(new CubeGame(parseInt(gameId!), bagDraws))
}

let testBag: BagDraw = {red: 12, green: 13, blue: 14}

let sumOfValidGameIds = allGames.reduce(
    (acc, cur) => {
        return acc + (cur.isGameValidForBag(testBag) ? cur.id : 0)
    },
    0,
);

console.log(sumOfValidGameIds)

function parseBagDraws(draws: string): BagDraw[] {
    let allDraws = draws.split(";")

    return allDraws.map(draw => {
        return {
            red: parseDraw(draw, "red"),
            blue: parseDraw(draw, "blue"),
            green: parseDraw(draw, "green")
        }
    })
}

function parseDraw(draw: string, color: string) {
    return parseInt(draw.match(RegExp(`[0-9]+ ${color}`))?.pop() ?? "0")
}
