import nReadlines from "n-readlines";

export function importScratchersFromFile(file: string): Scratcher[] {
    const lines = new nReadlines(file);

    let line;
    let scratchers: Scratcher[] = []

    while (line = lines.next()) {
        let [rawId, rawWinningNumbers, rawScratcherNumbers] = line.toString().split(/[:|]/g)

        let winningNumbers = rawWinningNumbers
            .split(" ")
            .filter(Boolean)
            .map(n => parseInt(n.trim()))

        let scratcherNumbers = rawScratcherNumbers
            .split(" ")
            .filter(Boolean)
            .map(n => parseInt(n.trim()))

        let id = parseInt(rawId.match(/[0-9]+/g)!.pop()!.trim())

        scratchers.push(new Scratcher(id, winningNumbers, scratcherNumbers))
    }

    return scratchers
}

export class Scratcher {
    score: number

    constructor(private id: number, private winningNumbers: number[], private scratcherNumbers: number[]) {
        this.score = this.calculateScore()
    }

    private calculateScore() {
        return this.winningNumbers.reduce((acc, cur) =>
            (this.scratcherNumbers.includes(cur) ? (acc === 0 ? 1 : 2 * acc) : acc), 0)
    }

    print() {
        console.log(`ID: ${this.id}, Score: ${this.score}`)
    }
}

