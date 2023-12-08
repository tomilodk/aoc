import fs from "fs";

const input = fs.readFileSync("./input", "utf-8");

const lines = input.split("\n");

const alphanumericNumbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];


type Digit = {
    index: number,
    num: number
}

const getAllNumbers = (line: string): Digit[] => {
    const characters = line.split("");

    const nums = characters.filter((character) => {
        const parsed = parseInt(character);
        return parsed.toString() != "NaN";

    }).map(character => { return { index: line.indexOf(character), num: parseInt(character) } });

    return nums;
}

const getFirstAlphanumericDigit = (line: string): Digit => {
    const an = alphanumericNumbers.filter(num => {
        return line.includes(num);
    });

    const sorted = an.map(num => {
        return { index: line.indexOf(num), num: alphanumericNumbers.indexOf(num) + 1 }
    }).sort((a, b) => {
        return a.index - b.index;
    })

    return sorted[0];
}

const getLastAlphanumericDigit = (line: string): Digit => {
    const an = alphanumericNumbers.filter(num => {
        return line.includes(num);
    });

    const sorted = an.map(num => {
        return { index: line.indexOf(num), num: alphanumericNumbers.indexOf(num) + 1 }
    }).sort((a, b) => {
        return a.index - b.index;
    })

    return sorted[sorted.length - 1];
}

const getFirstDigit = (allNums: Digit[]): Digit | undefined => {
    if (allNums.length == 0) return undefined;
    return allNums[0];
}

const getLastDigit = (allNums: Digit[]): Digit | undefined => {
    if (allNums.length == 0) return undefined;
    return allNums[allNums.length - 1];
}

let sum: number = 0;
for (const line of lines) {

    const allNums = getAllNumbers(line);

    const firstDigit = getFirstDigit(allNums);
    const lastDigit = getLastDigit(allNums);
    const firstAlphanumericDigit = getFirstAlphanumericDigit(line);
    const lastAlphanumericDigit = getLastAlphanumericDigit(line);

    const first = firstDigit == undefined ? firstAlphanumericDigit.num : firstDigit.index < firstAlphanumericDigit.index ? firstDigit.num.toString() : firstAlphanumericDigit.num;
    const last = lastDigit == undefined ? lastAlphanumericDigit.num : lastDigit.index > lastAlphanumericDigit.index ? lastDigit.num.toString() : lastAlphanumericDigit.num;

    const concatinated = `${first}${last}`;

    sum += parseInt(concatinated);
}

console.log(sum);