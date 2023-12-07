import fs from 'fs';

const input = fs.readFileSync('2023/7/input.txt').toString().split("\n");

const rankValues: Map<string, number> = new Map([['A', 0], ['K', 1], ['Q', 2], ['T', 3], ['9', 4], ['8', 5], ['7', 6], ['6', 7], ['5', 8], ['4', 9], ['3', 10], ['2', 11], ['J', 12]])

interface CamelHand {
    hand: string
    bet: number
}

let hands: CamelHand[] = input.map(l => {
    let [hand, bet] = l.split(" ")
    return {hand, bet: parseInt(bet)}
})

function getHandVal(counts: Map<string, number>): number {
    let max = Math.max(...counts.values())

    let numJokers = counts.get("J") ?? 0

    switch (numJokers) {
        case 0:
            if (counts.size === 1) return 0                   // 5 kind
            else if (max === 4) return 1                      // 4 kind
            else if (max === 3 && counts.size === 2) return 2 // fh
            else if (max === 3 && counts.size === 3) return 3 // 3 kind
            else if (max === 2 && counts.size === 3) return 4 // 2 pair
            else if (max === 2 && counts.size === 4) return 5 // 1 pair
            else return 6
        case 1:
            if (max === 4) return 0
            else if (max === 3 && counts.size === 2) return 1
            else if (max === 3 && counts.size === 3) return 1
            else if (max === 2 && counts.size === 3) return 2
            else if (max === 2 && counts.size === 4) return 3
            else return 5
        case 2:
            if (max === 3 && counts.size === 2) return 0
            else if (max === 2 && counts.size === 3) return 1
            else return 3
        case 3:
            if (max === 3 && counts.size === 2) return 0
            else return 1
        default:
            return 0
    }
}

hands.sort((x, y) => {
    const xCounts: Map<string, number> = new Map()
    const yCounts: Map<string, number> = new Map()

    let tieWinner = 0

    for (let i = 0; i < x.hand.length; i++) {
        xCounts.set(x.hand[i], (xCounts.get(x.hand[i]) ?? 0) + 1)
        yCounts.set(y.hand[i], (yCounts.get(y.hand[i]) ?? 0) + 1)

        if (tieWinner === 0 && rankValues.get(x.hand[i])! > rankValues.get(y.hand[i])!) tieWinner = -1 // x comes first
        else if (tieWinner === 0 && rankValues.get(x.hand[i])! < rankValues.get(y.hand[i])!) tieWinner = 1 // y comes first
    }

    const xVal = getHandVal(xCounts)
    const yVal = getHandVal(yCounts)

    if (xVal < yVal) return 1 // y comes first
    else if (xVal > yVal) return -1 // x comes first
    else return tieWinner
})

let sum = 0

for (let i = 0; i < hands.length; i++) {
    sum += hands[i].bet * (i + 1)
}

console.log(sum)