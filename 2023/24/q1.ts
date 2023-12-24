import fs from "fs";

// basically given a point and a slope for two lines, determine where they cross in 2d!
// this site was awesome: https://paulbourke.net/geometry/pointlineplane/
// used code from there to determine intersect point

const windowMin = 200000000000000
const windowMax = 400000000000000

interface Point {
    x: number
    y: number
    z: number
}

interface PointAndVelocity {
    p: Point
    vx: number
    vy: number
    vz: number
}

const points: PointAndVelocity[] = fs.readFileSync('2023/24/input.txt')
    .toString()
    .split("\n")
    .map(l => {
        const [x, y, z, vx, vy, vz] = l.replace("@", ",").split(",")
        return {
            p: {x: +x, y: +y, z: +z},
            vx: +vx,
            vy: +vy,
            vz: +vz
        }
    })

// adapted from https://paulbourke.net/geometry/pointlineplane/
function intersect2d(p1: Point, p2: Point, p3: Point, p4: Point): Point | false {

    // Check if none of the lines are of length 0
    if ((p1.x === p2.x && p1.y === p2.y) || (p3.x === p4.x && p3.y === p4.y)) return false

    let denominator = ((p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y))

    // Lines are parallel
    if (denominator === 0) return false

    let ua = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denominator
    let ub = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denominator

    // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) return false

    // Return a object with the x and y coordinates of the intersection
    let x = p1.x + ua * (p2.x - p1.x)
    let y = p1.y + ua * (p2.y - p1.y)

    return {x, y, z: 0}
}

const pairs = points.flatMap((pav1, i) => points.slice(i + 1).map(pav2 => {
    return {pav1, pav2}
}))

let totalXed = 0
pairs.forEach(pair => {
    const {pav1, pav2} = pair

    const p2: Point = {
        x: pav1.p.x + (pav1.vx * windowMax),
        y: pav1.p.y + (pav1.vy * windowMax),
        z: 0
    }

    const p4: Point = {
        x: pav2.p.x + (pav2.vx * windowMax),
        y: pav2.p.y + (pav2.vy * windowMax),
        z: 0
    }

    const intersect = intersect2d(pav1.p, p2, pav2.p, p4)

    if (intersect && intersect.x >= windowMin && intersect.x <= windowMax && intersect.y >= windowMin && intersect.y <= windowMax) totalXed++
})

console.log(totalXed)
