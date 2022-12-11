const input = await Deno.readTextFile("input.txt");

const lines = input.split("\n").map(l => l.split(","));

let count = 0;
let count2 = 0;

lines.forEach(line => {
    const r1 = line[0].split("-").map(n => parseInt(n))
    const r2 = line[1].split("-").map(n => parseInt(n))


    if (r1[0] >= r2[0] && r1[1] <= r2[1]) {
        // console.log({r1, r2})
        count++;
    } else if (r1[0] <= r2[0] && r1[1] >= r2[1]) {
        // console.log({r1, r2})
        count++;
    }

    if ((r1[0] >= r2[0] && r1[1] <= r2[1]) ||
        (r1[0] <= r2[1] && r1[0] >= r2[0]) ||
        (r2[0] <= r1[1] && r2[0] >= r1[0])) {
        console.log({ r1, r2 })
        count2++;
    }
});

console.log(count)
console.log(count2)