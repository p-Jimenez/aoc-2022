const inputOrders = await Deno.readTextFile("orders.txt");
const inputStack = await Deno.readTextFile("stack.txt");

const orders = inputOrders.split("\n").map(l => l.trim().split(" ")).map(o => ({
    quantity: parseInt(o[1]),
    from: parseInt(o[3]) - 1,
    to: parseInt(o[5]) - 1
}));

const stack = inputStack.split("\n").map(l => l.trim().split(" "));

const _moveStack = (order: { quantity: number, from: number, to: number }) => {
    for (let i = 0; i < order.quantity; i++) {
        stack[order.to].push(stack[order.from].pop()!);
    }
}

const moveStack2 = (order: { quantity: number, from: number, to: number }) => {
    const temp = [];
    for (let i = 0; i < order.quantity; i++) {
        temp.push(stack[order.from].pop()!);
    }

    temp.reverse();

    temp.forEach((t) => {
        stack[order.to].push(t);
    });
}


const getLastFromStack = () => {
    let total = "";
    stack.forEach((s) => {
        total += s[s.length - 1];
    });

    return total
}

console.log(stack);

orders.forEach(moveStack2);

console.log(stack);

console.log(getLastFromStack());