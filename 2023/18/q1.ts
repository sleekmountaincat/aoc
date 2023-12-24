import fs from "fs";

// ok, so found this thing called "picks theorem", which, for a polygon with integer vertices,
// describes a relationship between how many points are in a polygon, the area of the polygon,
// and how many points are on the boundary of the polygon.
//
// A = IP + .5BP - 1
// where A = area of polygon, IP = interior points, and BP = boundary points
//
// we can easily get the area using the shoelace formula, and calculating number of
// integer points on the boundary is ezpz, so using good old algebra we can solve for
// the number of interior points:
// A = IP + .5BP - 1
// A + 1 = IP + .5BP
// A + 1 - .5BP = IP

// then we just add the answer back to the number of boundary points!
// this is the total number of points ('#', or cubic meters of lava)
//
// https://brilliant.org/wiki/picks-theorem/#:~:text=As%20a%20powerful%20tool%2C%20the,performing%20all%20of%20these%20calculations.

interface Point {
    x: number
    y: number
    a?: number
}

const map = fs.readFileSync('2023/18/input.txt')
    .toString()
    .split("\n")

const pit: Point[] = []

let x = 0
let y = 0

map.forEach((l, i) => {
    let [d, n] = l.split(" ")

    if (d == "U") y += +n
    if (d == "D") y -= +n
    if (d == "R") x += +n
    if (d == "L") x -= +n

    pit.push({x, y})
})

const pointsOnBoundary = (v: Point[]): number => {
    let tot = 0

    for (let i = 0; i < v.length; i++) {
        var x1 = v[i].x
        var y1 = v[i].y
        var x2 = v[i == v.length - 1 ? 0 : i + 1].x
        var y2 = v[i == v.length - 1 ? 0 : i + 1].y

        tot += Math.abs(x1 - x2) + Math.abs(y1 - y2)
    }

    return tot
}

const areaOfPolygon = (v: Point[]) => {
    let sum1 = 0
    let sum2 = 0

    for (let i = 0; i < v.length - 1; i++) {
        sum1 += v[i].x * v[i + 1].y
        sum2 += v[i].y * v[i + 1].x
    }

    sum1 += v[v.length - 1].x * v[0].y
    sum2 += v[0].x * v[v.length - 1].y

    return Math.abs((sum1 - sum2) / 2)
}

let area = areaOfPolygon(pit)
let boundaryPoints = pointsOnBoundary(pit)

console.log((area + 1 - (.5*boundaryPoints)) + boundaryPoints)
