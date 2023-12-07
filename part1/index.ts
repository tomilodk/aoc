import fs from "fs";

const input = fs.readFileSync("./input", "utf-8");

const lines = input.split("\n");

const getAllNumbers = (line: string): number[] => {
    const characters = line.split("");

    const nums = characters.filter(character => {
        const parsed = parseInt(character);
        return parsed.toString() != "NaN";

    }).map(character => parseInt(character));

    return nums;
}

const getFirstDigit = (allNums: number[]) => {
    return allNums[0];
}

const getLastDigit = (allNums: number[]) => {
    return allNums[allNums.length - 1];
}
console.log(lines);

let sum: number = 0;
for (const line of lines) {
    const allNums = getAllNumbers(line);

    const first = getFirstDigit(allNums);
    const last = getLastDigit(allNums);

    const concatinated = `${first}${last}`;

    sum += parseInt(concatinated);
}

console.log(sum);