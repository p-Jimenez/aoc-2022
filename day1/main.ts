const input = await Deno.readTextFile("input.txt");

const fillArray = (input: string) => {
    const array = input.split("\n");

    const newArray: number[][] = [];

    let newItem: number[] = [];
    array.map((line) => line.replace("\r", "")).forEach((line) => {
        if (line === "") {
            newArray.push(newItem);
            newItem = [];
        } else {
            newItem.push(parseInt(line));
        }
    });

    return newArray;
}

const array = fillArray(input);

// get array with max sum
const getMaxSum = () => {
    let indexMaxSum = 0;
    const sum = array.reduce((acc, item, index) => {
        const sum = item.reduce((acc, item) => acc + item, 0);
        if (sum > acc) {
            indexMaxSum = index;
            return sum;
        }
        return acc;
    }, 0);

    return { sum, indexMaxSum };
}

const maxSum = getMaxSum();

console.log("max calories", maxSum.sum);

// get top 3 max sum

const getTop3MaxSum = (array: number[][]) => {

    const top3 = [];

    for (let i = 0; i < 3; i++) {
        const maxSum = getMaxSum();
        top3.push(maxSum);
        array[maxSum.indexMaxSum] = [];
    }

    return top3;
}

const top3 = getTop3MaxSum(array);

console.log("top 3", top3);

// sum top 3

const sumTop3 = () => top3.reduce((acc, item) => acc + item.sum, 0);

console.log("sum top 3", sumTop3());