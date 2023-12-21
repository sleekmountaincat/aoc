export type Module = FlipFlop | Conjunction | Broadcaster | Output

export class FlipFlop {
    private isOn: boolean = false
    public highCount = 0
    public lowCount = 0

    constructor(private name: string, public connectedModules: string[]) {
    }

    public register(name: string) {
    }

    public processSignal(inSignal: Signal): ModuleResult[] {
        inSignal.pulse == Pulse.LOW ? this.lowCount++ : this.highCount++

        const result: ModuleResult[] = []

        if (inSignal.pulse == Pulse.LOW) {
            const signal: Signal = {
                origin: this.name,
                pulse: this.isOn ? Pulse.LOW : Pulse.HIGH
            }

            this.connectedModules.forEach(destination => {
                result.push({destination, signal})
            })

            this.isOn = !this.isOn
        }

        return result
    }
}

export class Conjunction {
    private memory: Map<string, Pulse> = new Map
    public highCount = 0
    public lowCount = 0

    constructor(private name: string, public connectedModules: string[]) {
    }

    public register(name: string) {
        this.memory.set(name, Pulse.LOW)
    }

    public processSignal(inSignal: Signal): ModuleResult[] {
        inSignal.pulse == Pulse.LOW ? this.lowCount++ : this.highCount++

        this.memory.set(inSignal.origin, inSignal.pulse)
        const signal: Signal = {
            origin: this.name,
            pulse: [...this.memory.values()].every(p => p == Pulse.HIGH) ? Pulse.LOW : Pulse.HIGH
        }

        return this.connectedModules.map(destination => {
            return {destination, signal}
        })
    }
}

export class Broadcaster {
    public highCount = 0
    public lowCount = 0

    constructor(private name: string, public connectedModules: string[]) {
    }

    public register(name: string) {
    }

    public processSignal(inSignal: Signal): ModuleResult[] {
        inSignal.pulse == Pulse.LOW ? this.lowCount++ : this.highCount++

        const signal: Signal = {
            origin: this.name,
            pulse: inSignal.pulse
        }

        return this.connectedModules.map(destination => {
            return {destination, signal}
        })
    }
}

export class Output {
    public highCount = 0
    public lowCount = 0

    constructor(private name: string, public connectedModules: string[]) {
    }

    public register(name: string) {
    }

    public processSignal(inSignal: Signal): ModuleResult[] {
        inSignal.pulse == Pulse.LOW ? this.lowCount++ : this.highCount++

        return []
    }
}

export type Signal = {
    origin: string
    pulse: Pulse
}

export enum Pulse {
    LOW,
    HIGH
}

export interface ModuleResult {
    destination: string
    signal: Signal
}

export interface Results {
    results: ModuleResult[]
    priority: number
}