import fs from 'fs';

const input = fs.readFileSync('2023/7/inputtest.txt').toString().split("\n");

const rankValues: Map<string, number> = new Map([['A', 0], ['K', 1], ['Q', 2], ['J', 3], ['T', 4], ['9', 5], ['8', 6], ['7', 7], ['6', 8], ['5', 9], ['4', 10], ['3', 11], ['2', 12]])

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

    if (counts.size === 1) return 0                   // 5 kind
    else if (max === 4) return 1                      // 4 kind
    else if (max === 3 && counts.size === 2) return 2 // fh
    else if (max === 3 && counts.size === 3) return 3 // 3 kind
    else if (max === 2 && counts.size === 3) return 4 // 2 pair
    else if (max === 2 && counts.size === 4) return 5 // 1 pair
    else return 6                                     // high card
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