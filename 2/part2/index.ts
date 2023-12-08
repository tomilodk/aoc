import fs from "fs";

const input = fs.readFileSync("./input", "utf-8");

type GameSet = {
    redCount: number,
    greenCount: number,
    blueCount: number,
}

type Game = {
    sets: GameSet[]
}

const games = input.split("\n").map(game => {
    game = game.replace(/Game \d+:/g, "");
    return {
        sets: game.split(";").map(set => {
            const redCount = parseInt(set.match(/\d+ red/g)?.[0] ?? "0");
            const greenCount = parseInt(set.match(/\d+ green/g)?.[0] ?? "0");
            const blueCount = parseInt(set.match(/\d+ blue/g)?.[0] ?? "0");

            return {
                redCount,
                greenCount,
                blueCount,
            };
        }),
    }
}) satisfies Game[];

const getMinimumAmountOfSetsOfCubesInGame = (game: Game): GameSet => {
    const gameSets = game.sets;
    const redMaxCount = gameSets.sort((a, b) => b.redCount - a.redCount)[0].redCount;
    const greenMaxCount = gameSets.sort((a, b) => b.greenCount - a.greenCount)[0].greenCount;
    const blueMaxCount = gameSets.sort((a, b) => b.blueCount - a.blueCount)[0].blueCount;

    return {
        redCount: redMaxCount,
        greenCount: greenMaxCount,
        blueCount: blueMaxCount,
    }
}

const powerOfSet = (set: GameSet): number => {
    return set.redCount * set.greenCount * set.blueCount;
}

let sumOfGameIndicies = 0;

for (const game of games) {
    sumOfGameIndicies += powerOfSet(getMinimumAmountOfSetsOfCubesInGame(game));
}

console.log(sumOfGameIndicies)
