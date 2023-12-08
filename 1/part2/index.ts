import fs from "fs";

const input = fs.readFileSync("./input", "utf-8");

const lines = input.split("\n");

const alphanumericNumbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

type Digit = {
    index: number,
    num: number
}

const getAllNumbers = (line: string, reversed: boolean = false): Digit[] => {
    const characters = line.split("");

    const nums = characters.filter((character) => {
        const parsed = parseInt(character);
        return parsed.toString() != "NaN";

    }).map(character => { return { index: reversed ? line.lastIndexOf(character) : line.indexOf(character), num: parseInt(character) } });

    return nums;
}

const getFirstAlphanumericDigit = (line: string): Digit | undefined => {
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

const getLastAlphanumericDigit = (line: string): Digit | undefined => {
    const an = alphanumericNumbers.filter(num => {
        return line.includes(num);
    });

    const sorted = an.map(num => {
        return { index: line.lastIndexOf(num), num: alphanumericNumbers.indexOf(num) + 1 }
    }).sort((a, b) => {
        return a.index - b.index;
    });

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

    const allNumsReversed = getAllNumbers(line, true);
    const lastDigit = getLastDigit(allNumsReversed);

    const firstAlphanumericDigit = getFirstAlphanumericDigit(line);
    const lastAlphanumericDigit = getLastAlphanumericDigit(line);


    let first: string = "";
    let last: string = "";

    if (firstDigit != undefined && firstAlphanumericDigit != undefined) {
        if (firstDigit.index < firstAlphanumericDigit.index) {
            first = firstDigit.num.toString();
        } else {
            first = firstAlphanumericDigit.num.toString();
        }
    } else if (firstDigit != undefined) {
        first = firstDigit.num.toString();
    } else if (firstAlphanumericDigit != undefined) {
        first = firstAlphanumericDigit.num.toString();
    }

    if (lastDigit != undefined && lastAlphanumericDigit != undefined) {
        if (lastDigit.index > lastAlphanumericDigit.index) {
            last = lastDigit.num.toString();
        } else {
            last = lastAlphanumericDigit.num.toString();
        }
    } else if (lastDigit != undefined) {
        last = lastDigit.num.toString();
    } else if (lastAlphanumericDigit != undefined) {
        last = lastAlphanumericDigit.num.toString();
    }

    const concatinated = `${first}${last}`;

    sum += parseInt(concatinated);
}

console.log(sum, lines.length);