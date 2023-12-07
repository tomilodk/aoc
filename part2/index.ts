import fs from "fs";

const input = fs.readFileSync("./input", "utf-8");

const lines = input.split("\n");

const alphanumericNumbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const getAllNumbers = (line: string): number[] => {
    const characters = line.split("");

    const nums = characters.filter(character => {
        const parsed = parseInt(character);
        return parsed.toString() != "NaN";

    }).map(character => parseInt(character));

    return nums;
}

const convertLineToRealNumbers = (line: string) => {
    const an = alphanumericNumbers.filter(num => {
        return line.includes(num);
    });

    const sorted = an.map(num => {
        return { index: line.indexOf(num), num: num }
    }).sort((a, b) => {
        return a.index - b.index;
    }).map(num => num.num);

    for (let i = 0; i < sorted.length; i++) {
        const num = i == 0 ? sorted[i] : sorted[sorted.length - 1];
        line = line.replace(num, (alphanumericNumbers.indexOf(num) + 1).toString());
    }

    return line;
}

const getFirstDigit = (allNums: number[]) => {
    return allNums[0];
}

const getLastDigit = (allNums: number[]) => {
    return allNums[allNums.length - 1];
}
const newLines = lines.map(line => convertLineToRealNumbers(line));

let sum: number = 0;
for (const line of newLines) {
    const allNums = getAllNumbers(line);

    const first = getFirstDigit(allNums);
    const last = getLastDigit(allNums);

    const concatinated = `${first}${last}`;

    console.log(line, concatinated);

    sum += parseInt(concatinated);
}

console.log(sum);