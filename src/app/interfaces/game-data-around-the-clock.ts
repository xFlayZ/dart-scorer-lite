export interface GameDataAroundTheClock {
    player: string;
    score: number;
    wins: number;
    roundAverage: number;
    totalAverage: number;
    highestRound: number;
    firstDart: string;
    secondDart: string;
    thirdDart: string;
    roundTotal: number;
    round: number;
    game: number;
    trysForOne: number;
    trysForTwo: number;
    trysForThree: number;
    trysForFour: number;
    trysForFive: number;
    trysForSix: number;
    trysForSeven: number;
    trysForEight: number;
    trysForNine: number;
    trysForTen: number;
    trysForEleven: number;
    trysForTwelve: number;
    trysForThirteen: number;
    trysForFourteen: number;
    trysForFifteen: number;
    trysForSixteen: number;
    trysForSeventeen: number;
    trysForEighteen: number;
    trysForNineteen: number;
    trysForTwenty: number;
    [key: string]: string | number;
}