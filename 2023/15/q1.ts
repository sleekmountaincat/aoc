import fs from 'fs'

console.log(fs.readFileSync('2023/15/input.txt')
    .toString()
    .split(",")
    .map(s => {
        let ans = 0
        s.split("").forEach(c => {
            ans += c.charCodeAt(0)
            ans *= 17
            ans %= 256
        })
        return ans
    })
    .reduce((a, c) => a + c))



