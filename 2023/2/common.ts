export class CubeGame {
    private readonly _maxKnownRed: number;
    private readonly _maxKnownBlue: number;
    private readonly _maxKnownGreen: number;

    constructor(
        private _id: number,
        private _bagDraws: BagDraw[]
    ) {
        this._maxKnownRed = Math.max(...this._bagDraws.map(bagDraw => bagDraw.red), 0);
        this._maxKnownBlue = Math.max(...this._bagDraws.map(bagDraw => bagDraw.blue), 0);
        this._maxKnownGreen = Math.max(...this._bagDraws.map(bagDraw => bagDraw.green), 0);
    }

    get id(): number {
        return this._id;
    }

    isGameValidForBag(bag: BagDraw): boolean {
        return this._maxKnownRed <= bag.red && this._maxKnownBlue <= bag.blue && this._maxKnownGreen <= bag.green
    }

    print() {
        let allDraws = this._bagDraws.map(draw => {
            return `r:${draw.red},b:${draw.blue},g:${draw.green}`
        }).join(";")

        console.log(`${this._id} R:${this._maxKnownRed},B:${this._maxKnownBlue},G:${this._maxKnownGreen} ${allDraws}`)
    }
}

// 12 red cubes, 13 green cubes, and 14 blue cubes

export interface BagDraw {
    red: number,
    blue: number,
    green: number
}