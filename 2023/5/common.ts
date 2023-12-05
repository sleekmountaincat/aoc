export interface AlmanacRange {
    destStart: number,
    sourceStart: number,
    length: number
}

export class AlmanacMap {
    private mapRanges: AlmanacRange[] = []

    constructor() {
    }

    public addRange(destStart: number, sourceStart: number, length: number) {
        this.mapRanges.push({destStart, sourceStart, length})
    }

    public getOutput(input: number): number {
        return this.mapRanges.reduce((a, c) => {
            return input >= c.sourceStart && input < c.sourceStart + c.length ? (input - c.sourceStart) + c.destStart : a
        }, input)
    }
}
