import fs from "fs";

type Rule = {
    component?: string,
    compare?: string,
    value?: number
    dest: string
}

const procs: Map<string, Rule[]> = new Map
const accepted: Record<string, number>[] = []
const parts: Record<string, number>[] = []

const inp = fs.readFileSync('2023/19/input.txt')
    .toString()
    .split("\n\n")
    .map((s,i) => {
        return s.split("\n")
    })

inp[0].forEach(s=>{
    const [ruleName, rawRules] = s.split(/[\{}]/)
    const rules: Rule[] = []

    rawRules.split(",").forEach(rr=>{
        if (rr.includes(":")) {
            const value = +rr.match(/[0-9]+/)![0]
            const compare = rr.includes("<") ? "lt" : "gt"
            const [component] = rr.split(/[<>]/)[0]
            const [junk, dest] = rr.split(":")

            rules.push({
                component,
                compare,
                value,
                dest
            })
        } else {
            rules.push({dest: rr})
        }
    })

    procs.set(ruleName, rules)
})

inp[1].forEach(l=>{
    let p: Record<string, number> = {}
    const [junk, x, m, a, s] = /x=([0-9]+),m=([0-9]+),a=([0-9]+),s=([0-9]+)*/.exec(l)!

    p["x"] = +x
    p["m"] = +m
    p["a"] = +a
    p["s"] = +s

    parts.push(p)
})

function sendIt(part: Record<string, number>, dest: string) {
    if (dest == "A") accepted.push(part)

    else if (dest != "R") runRules(procs.get(dest)!, part)
}

const runRules = (proc: Rule[], part: Record<string, number>) => {
   for(const r of proc) {
        if (r.component && r.value && r.compare) {
            let v = part[r.component]

            if (r.compare == "lt" && v < r.value) {
                sendIt(part, r.dest)
                break
            }
            else if (r.compare == "gt" && v > r.value) {
                sendIt(part, r.dest)
                break
            }
        } else {
            sendIt(part, r.dest)
            break
        }
    }
}

parts.forEach(p => runRules(procs.get("in")!, p))

const sum = accepted.reduce((a,c)=>{

    return a + c["x"] + c["m"] + c["a"] + c["s"]
},0)

console.log(sum)
