import { Component, Input, OnInit } from '@angular/core';
import { shuffleArray } from '../helpers';
import { GameDataAroundTheClock } from '../interfaces/game-data-around-the-clock';

@Component({
  selector: 'app-dart-game-around-the-clock',
  templateUrl: './dart-game-around-the-clock.component.html',
  styleUrl: './dart-game-around-the-clock.component.scss'
})
export class DartGameAroundTheClockComponent implements OnInit {
  public gameData: GameDataAroundTheClock[] = [];
  public playerCount = 0;
  public currentPlayerCount = 0;
  public lastThrownNumber = "-";
  public winnerModalOpen = false;
  public inRound = true;
  public isWinner = false;
  public legEnd = false;

  @Input() players: string[] = [];

  ngOnInit(): void {
    this.setupGame();
  }

  setupGame() {
    const savedData = localStorage.getItem('gameStartedData');
    if (savedData) {
      const { players } = JSON.parse(savedData);
      this.players = players;
    }

    const shuffledPlayers = shuffleArray(this.players);

    this.gameData = shuffledPlayers.map(player => ({
      player: player,
      score: 1,
      wins: 0,
      roundAverage: 0,
      totalAverage: 0,
      highestRound: 0,
      firstDart: '-',
      secondDart: '-',
      thirdDart: '-',
      roundTotal: 0,
      round: 1,
      game: 0,
      trysForOne: 0,
      trysForTwo: 0,
      trysForThree: 0,
      trysForFour: 0,
      trysForFive: 0,
      trysForSix: 0,
      trysForSeven: 0,
      trysForEight: 0,
      trysForNine: 0,
      trysForTen: 0,
      trysForEleven: 0,
      trysForTwelve: 0,
      trysForThirteen: 0,
      trysForFourteen: 0,
      trysForFifteen: 0,
      trysForSixteen: 0,
      trysForSeventeen: 0,
      trysForEighteen: 0,
      trysForNineteen: 0,
      trysForTwenty: 0,
    }));

    this.playerCount = this.players.length - 1;
    localStorage.setItem('gameData', JSON.stringify(this.gameData));
  }

  onThrownNumberChange(thrownNumber: string) {
      if (this.inRound) {
        const currentPlayer = this.gameData[this.currentPlayerCount];
        const darts = ['firstDart', 'secondDart', 'thirdDart'];
        const emptyDartIndex = darts.findIndex(dart => currentPlayer[dart] === '-');
        
        if (emptyDartIndex !== -1) {
          this.updatePlayerScore(thrownNumber);
          currentPlayer[darts[emptyDartIndex]] = thrownNumber;
        }
  
        if (emptyDartIndex === 2) {
          this.inRound = false;
        }
      }
      this.lastThrownNumber = thrownNumber;
    }

    updatePlayerScore(thrownNumber: string) {
      const currentPlayer = this.gameData[this.currentPlayerCount];
      const multiplier = thrownNumber.charAt(0);
      const number = (multiplier === 'T' || multiplier === 'D') ? thrownNumber.slice(1) : thrownNumber;
      const score = parseInt(number);

      if (currentPlayer.score === 1) {
        currentPlayer.trysForOne += 1;
      }

      if (currentPlayer.score === 2) {
        currentPlayer.trysForTwo += 1;
      }

      if (currentPlayer.score === 3) {
        currentPlayer.trysForThree += 1;
      }

      if (currentPlayer.score === 4) {
        currentPlayer.trysForFour += 1;
      }

      if (currentPlayer.score === 5) {
        currentPlayer.trysForFive += 1;
      }

      if (currentPlayer.score === 6) {
        currentPlayer.trysForSix += 1;
      }

      if (currentPlayer.score === 7) {
        currentPlayer.trysForSeven += 1;
      }

      if (currentPlayer.score === 8) {
        currentPlayer.trysForEight += 1;
      }

      if (currentPlayer.score === 9) {
        currentPlayer.trysForNine += 1;
      }
      if (currentPlayer.score === 10) {
        currentPlayer.trysForTen += 1;
      }

      if (currentPlayer.score === 11) {
        currentPlayer.trysForEleven += 1;
      }

      if (currentPlayer.score === 12) {
        currentPlayer.trysForTwelve += 1;
      }

      if (currentPlayer.score === 13) {
        currentPlayer.trysForThirteen += 1;
      }

      if (currentPlayer.score === 14) {
        currentPlayer.trysForFourteen += 1;
      }

      if (currentPlayer.score === 15) {
        currentPlayer.trysForFifteen += 1;
      }

      if (currentPlayer.score === 16) {
        currentPlayer.trysForSixteen += 1;
      }

      if (currentPlayer.score === 17) {
        currentPlayer.trysForSeventeen += 1;
      }

      if (currentPlayer.score === 18) {
        currentPlayer.trysForEighteen += 1;
      }

      if (currentPlayer.score === 19) {
        currentPlayer.trysForNineteen += 1;
      }

      if (currentPlayer.score === 20) {
        currentPlayer.trysForTwenty += 1;
      }

      if (currentPlayer.score === score && currentPlayer.score !== 20) {
        currentPlayer.score += 1;
      }

      if (currentPlayer.score === 20 && score === 20) {
        this.isWinner = true;
        this.inRound = false;
      }
      localStorage.setItem('gameData', JSON.stringify(this.gameData));
    }

    nextPlayer() {
      const currentPlayer = this.gameData[this.currentPlayerCount];

      if (this.isWinner) {
        this.winnerModalOpen = true;
      } else {
        currentPlayer.roundAverage = parseFloat((currentPlayer.roundTotal / currentPlayer.round).toFixed(2));
        currentPlayer.firstDart = '-';
        currentPlayer.secondDart = '-';
        currentPlayer.thirdDart = '-';
        currentPlayer.round += 1;

        this.currentPlayerCount = (this.playerCount > this.currentPlayerCount) ? this.currentPlayerCount + 1 : 0;
      }
      this.inRound = true;
      localStorage.setItem('gameData', JSON.stringify(this.gameData));
    }

    nextRound() {
      if (this.gameData && this.gameData.length > 0) {
        const lastPlayer = this.gameData.shift();
  
        if (lastPlayer) {
          this.gameData.push(lastPlayer);
        }
  
        this.gameData.forEach(player => {
          if (player) {
            player.roundTotal = 0;
            player.firstDart = '-';
            player.secondDart = '-';
            player.thirdDart = '-';
            player.round = 1;
            player.roundAverage = 0;
            player.score = 1;
            player.trysForOne = 0,
            player.trysForTwo = 0,
            player.trysForThree = 0,
            player.trysForFour = 0,
            player.trysForFive = 0,
            player.trysForSix = 0,
            player.trysForSeven = 0,
            player.trysForEight = 0,
            player.trysForNine = 0,
            player.trysForTen = 0,
            player.trysForEleven = 0,
            player.trysForTwelve = 0,
            player.trysForThirteen = 0,
            player.trysForFourteen = 0,
            player.trysForFifteen = 0,
            player.trysForSixteen = 0,
            player.trysForSeventeen = 0,
            player.trysForEighteen = 0,
            player.trysForNineteen = 0,
            player.trysForTwenty = 0
          }
        });
  
        if (this.gameData[0]) {
          this.gameData[0].game++;
        }
  
        this.playerCount = this.gameData.length - 1;
      }
      this.legEnd = false;
      localStorage.setItem('gameData', JSON.stringify(this.gameData));
    }

    deleteLastDart() {
      const currentPlayer = this.gameData[this.currentPlayerCount];
      const darts = ['thirdDart', 'secondDart', 'firstDart'];
      const filledDartIndex = darts.findIndex(dart => typeof currentPlayer[dart] === 'string' && currentPlayer[dart] !== '-');
  
      if (filledDartIndex !== -1) {
          const score = currentPlayer[darts[filledDartIndex]] as string;
          const multiplier = score.charAt(0);
          const number = (multiplier === 'T' || multiplier === 'D') ? score.slice(1) : score;
          const multiplierFactor = (multiplier === 'T') ? 3 : (multiplier === 'D') ? 2 : 1;
  
          if (currentPlayer.score === parseInt(number) + 1 && parseInt(number) + 1 !== 1) {
            currentPlayer.score -= 1;
          }

          if (currentPlayer.score === 1) {
            currentPlayer.trysForOne -= 1;
          }
  
          if (currentPlayer.score === 2) {
            currentPlayer.trysForTwo -= 1;
          }
  
          if (currentPlayer.score === 3) {
            currentPlayer.trysForThree -= 1;
          }
  
          if (currentPlayer.score === 4) {
            currentPlayer.trysForFour -= 1;
          }
  
          if (currentPlayer.score === 5) {
            currentPlayer.trysForFive -= 1;
          }
  
          if (currentPlayer.score === 6) {
            currentPlayer.trysForSix -= 1;
          }
  
          if (currentPlayer.score === 7) {
            currentPlayer.trysForSeven -= 1;
          }
  
          if (currentPlayer.score === 8) {
            currentPlayer.trysForEight -= 1;
          }
  
          if (currentPlayer.score === 9) {
            currentPlayer.trysForNine -= 1;
          }
          if (currentPlayer.score === 10) {
            currentPlayer.trysForTen -= 1;
          }
  
          if (currentPlayer.score === 11) {
            currentPlayer.trysForEleven -= 1;
          }
  
          if (currentPlayer.score === 12) {
            currentPlayer.trysForTwelve -= 1;
          }
  
          if (currentPlayer.score === 13) {
            currentPlayer.trysForThirteen -= 1;
          }
  
          if (currentPlayer.score === 14) {
            currentPlayer.trysForFourteen -= 1;
          }
  
          if (currentPlayer.score === 15) {
            currentPlayer.trysForFifteen -= 1;
          }
  
          if (currentPlayer.score === 16) {
            currentPlayer.trysForSixteen -= 1;
          }
  
          if (currentPlayer.score === 17) {
            currentPlayer.trysForSeventeen -= 1;
          }
  
          if (currentPlayer.score === 18) {
            currentPlayer.trysForEighteen -= 1;
          }
  
          if (currentPlayer.score === 19) {
            currentPlayer.trysForNineteen -= 1;
          }
  
          if (currentPlayer.score === 20) {
            currentPlayer.trysForTwenty -= 1;
          }
          currentPlayer[darts[filledDartIndex]] = '-';
      }
      this.isWinner = false;
      this.inRound = true;
      localStorage.setItem('gameData', JSON.stringify(this.gameData));
  }

  closeWinnerModal() {
    const currentPlayer = this.gameData[this.currentPlayerCount];
    currentPlayer.wins += 1;
    this.legEnd = true;
    this.winnerModalOpen = false;
    this.isWinner = false;
    localStorage.setItem('gameData', JSON.stringify(this.gameData));
  }

  get sortedGameData() {
    return this.gameData.slice().sort((a, b) => b.wins - a.wins);
  }

  updateDartValue(dartType: string) {
  // add updateDartValue later!
  }
}
