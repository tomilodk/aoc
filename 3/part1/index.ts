import fs from "fs";

const input = fs.readFileSync("./input", "utf-8");

const rows = input.split("\n").map(row => row.split(""));
const width = rows[0].length;
const height = rows.length;


let curRow = 0;
let curCol = 0;

type NumberDetails = {
    number: number,
    colIndicies: number[],
    rowIndex: number
}

type NextNumber = {
    numberDetails: NumberDetails,
    nextIndex: number,
}

const tryParseInt = (str: string): number | undefined => {
    const num = parseInt(str);

    if (isNaN(num)) {
        return undefined;
    }

    return num;
}

const getNextNumInRow = (row: string[], offset: number, rowIndex: number): NextNumber => {
    let num = "0";
    let nextIndex = 0;
    const colIndicies: number[] = [];

    for (let curCol = offset; curCol < width; curCol++) {
        const col = row[curCol];

        const currentColNum = tryParseInt(col);
        if (currentColNum !== undefined) {
            num += currentColNum.toString();
            colIndicies.push(curCol);

            if (curCol === width - 1) {
                nextIndex = width;
                break;
            }
        }
        else {
            nextIndex = curCol + 1;
            break;
        }
    }

    return {
        numberDetails:
        {
            number: parseInt(num),
            colIndicies,
            rowIndex
        },
        nextIndex
    };
}

const getAllNumberDetails = (): NumberDetails[] => {
    const allNumberDetails: NumberDetails[] = []

    for (let curRow = 0; curRow < height; curRow++) {
        const row = rows[curRow];
        let nextIndex = 0;
        while (nextIndex < width) {
            const { numberDetails, nextIndex: newNextIndex } = getNextNumInRow(row, nextIndex, curRow);
            if (numberDetails.number !== 0) allNumberDetails.push(numberDetails);
            nextIndex = newNextIndex;
        }
    }

    return allNumberDetails;
}

const allNumberDetails = getAllNumberDetails();

const isSpecialCharacter = (char: string): boolean => {
    if (char.length != 1) throw new Error("char must be a single character");

    const regex = /[^\d|\.]/g

    return !!char.match(regex);
}

const hasSpecialCharacterBeside = (row: string[], col: number) => {
    const colLeft = row[col - 1];
    const colRight = row[col + 1];

    if(!colLeft || !colRight) return false;

    return isSpecialCharacter(colLeft) || isSpecialCharacter(colRight);
}

const hasSpecialCharacterAround = (row: number, col: number) => {
    let hasSpecialCharacterAroundResult = false;

    if (row !== 0) {
        const rowAbove = rows[row - 1];
        hasSpecialCharacterAroundResult = hasSpecialCharacterAroundResult || hasSpecialCharacterBeside(rowAbove, col)
    }
    if (row !== height - 1) {
        const rowBelow = rows[row + 1];
        hasSpecialCharacterAroundResult = hasSpecialCharacterAroundResult || hasSpecialCharacterBeside(rowBelow, col)
    }

    const curRow = rows[row];
    hasSpecialCharacterAroundResult = hasSpecialCharacterAroundResult || hasSpecialCharacterBeside(curRow, col)

    return hasSpecialCharacterAroundResult;
}

const validateNumberDetails = (numberDetails: NumberDetails): boolean => {
    const { colIndicies, rowIndex } = numberDetails;

    for(const colIndex of colIndicies) {
        if (hasSpecialCharacterAround(rowIndex, colIndex)) return true;
    }

    return false;
}

const getAllValidNumbers = (): number[] => {
    let validNumbers: number[] = []

    for (const numberDetails of allNumberDetails) {
        if (validateNumberDetails(numberDetails)) validNumbers.push(numberDetails.number);
    }

    return validNumbers;
}

const allValidNumbers = getAllValidNumbers();

const sumOfAllValidNumbers = allValidNumbers.reduce((acc, cur) => acc + cur, 0);

console.log(sumOfAllValidNumbers)