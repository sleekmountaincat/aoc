import fs from "fs";
import {Heap} from 'heap-js';
import {Broadcaster, Conjunction, FlipFlop, Module, ModuleResult, Output, Pulse, Results} from "./common";

const modules: Map<string, Module> = new Map()

const flipflops: Map<string, string[]> = new Map()
const conjunctions: string[] = []

fs.readFileSync('2023/20/input.txt')
    .toString()
    .split("\n")
    .forEach(l => {
        const [module, rawDestinations] = l.split("->").map(n => n.trim())
        const destinations = rawDestinations.split(",").map(n => n.trim())

        if (module.includes("%")) {
            flipflops.set(module.replace("%", ""), destinations)
        } else if (module.includes("&")) {
            const name = module.replace("&", "")

            conjunctions.push(name)
            modules.set(name, new Conjunction(name, destinations))
        } else if (module.includes("broadcaster")) {
            modules.set(module, new Broadcaster(module, destinations))
        }
    })

flipflops.forEach((destinations, name) => {
    destinations.forEach(destination => {
        if (conjunctions.includes(destination)) {
            modules.get(destination)!.register(name)
        }
    })

    modules.set(name, new FlipFlop(name, destinations))
})

const heap = new Heap((a: Results, b: Results) => a.priority - b.priority)
let priority = 0

modules.set("output", new Output("output", []))

const startSignal = {origin: "button", pulse: Pulse.LOW}
const broadcaster = modules.get("broadcaster")!

for (let x = 0; x < 1000; x++) {
    heap.push({
        results: broadcaster.processSignal(startSignal),
        priority: priority++
    })


    while (!heap.isEmpty()) {
        let {results} = heap.pop()!

        results.forEach(r => {
            const m = modules.get(r.destination)!

            heap.push({
                results: m.processSignal(r.signal),
                priority: priority++
            })
        })
    }
}

let lowCount = 0
let highCount = 0

modules.forEach((v, k) => {
    lowCount += v.lowCount
    highCount += v.highCount
})

console.log(lowCount, highCount, lowCount * highCount)