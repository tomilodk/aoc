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


const testGameSet = {
    redCount: 12,
    greenCount: 13,
    blueCount: 14,
} satisfies GameSet;

const testIfGameCanBePlayed = (game: Game) => {
    const gameSets = game.sets;
    const redCount = gameSets.reduce((prev, curr) => prev + curr.redCount, 0);
    const greenCount = gameSets.reduce((prev, curr) => prev + curr.greenCount, 0);
    const blueCount = gameSets.reduce((prev, curr) => prev + curr.blueCount, 0);

    return redCount <= testGameSet.redCount &&
        greenCount <= testGameSet.greenCount &&
        blueCount <= testGameSet.blueCount;
}

let sumOfGameIndicies = 0;

for (const game of games) {
    sumOfGameIndicies += testIfGameCanBePlayed(game) ? games.indexOf(game) + 1 : 0;
}

console.log(sumOfGameIndicies)
