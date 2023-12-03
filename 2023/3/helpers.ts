import nReadlines from "n-readlines";

export function parseInput(file: string): string[] {
    const lines = new nReadlines(file);

    let engine: string[] = []
    let line;

    while (line = lines.next()) {
        engine.push(line.toString())
    }

    return engine
}

export function findCandidatePartNumbers(engine: string[]) {
    let partNumbers: PartNumber[] = []

    for(let x= 0; x < engine.length; x++) {
        let rawPartNumbers = engine[x].matchAll(/[0-9]+/g)
        for(const rawPartNumber of rawPartNumbers!) {
            partNumbers.push({
                row: x,
                start: rawPartNumber.index!,
                end: rawPartNumber.index! + rawPartNumber[0].length - 1,
                value: parseInt(rawPartNumber.pop()!)
            })
        }
    }

    return partNumbers;
}

export function isSymbolAdjacent(engine: string[], maybePartNumber: PartNumber) {
    let rows = engine.length - 1
    let cols = engine[0].length - 1

    for (let r = Math.max(0, maybePartNumber.row - 1); r <= Math.min(rows, maybePartNumber.row + 1); r++){
        for(let c = Math.max(0, maybePartNumber.start - 1); c <= Math.min(cols, maybePartNumber.end + 1); c++) {
            if (engine[r][c] == "*") {
                maybePartNumber.gearIndex = `${r},${c}`
            }

            if (engine[r][c].match(/[0-9.]/) == null) return true
        }
    }

    return false
}

export interface PartNumber {
    row: number
    start: number
    end: number
    value: number
    gearIndex?: string
}