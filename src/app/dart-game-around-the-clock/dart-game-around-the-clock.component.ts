import { Component, Input, OnInit } from '@angular/core';
import { GameData } from '../interfaces/game-data.interface';
import { shuffleArray } from '../helpers';

@Component({
  selector: 'app-dart-game-around-the-clock',
  templateUrl: './dart-game-around-the-clock.component.html',
  styleUrl: './dart-game-around-the-clock.component.scss'
})
export class DartGameAroundTheClockComponent implements OnInit {
  public gameData: GameData[] = [];
  public playerCount = 0;
  public currentPlayerCount = 0;
  public winnerModalOpen = false;
  public inRound = true;
  public isWinner = false;

  @Input() players: string[] = [];

  ngOnInit(): void {
    this.setupGame();
  }

  setupGame() {
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
      game: 0
    }));

    this.playerCount = this.players.length - 1;
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
  
        if (emptyDartIndex === 2 || currentPlayer.score > 21) {
          this.inRound = false;
        }
      }
    }

    updatePlayerScore(thrownNumber: string) {
      const currentPlayer = this.gameData[this.currentPlayerCount];
      const multiplier = thrownNumber.charAt(0);
      const number = (multiplier === 'T' || multiplier === 'D') ? thrownNumber.slice(1) : thrownNumber;
      const score = parseInt(number)

      if (currentPlayer.score === score && currentPlayer.score !== 20) {
        currentPlayer.score += 1;
      }

      if (currentPlayer.score === 20 && score === 20) {
        this.isWinner = true;
        this.inRound = false;
      }
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
          }
        });
  
        if (this.gameData[0]) {
          this.gameData[0].game++;
        }
  
        this.playerCount = this.gameData.length - 1;
      }
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
          currentPlayer[darts[filledDartIndex]] = '-';
      }
      this.inRound = true;
  }

  closeWinnerModal() {
    const currentPlayer = this.gameData[this.currentPlayerCount];
    currentPlayer.wins += 1;
    this.nextRound();
    this.winnerModalOpen = false;
    this.isWinner = false;
  }

  get sortedGameData() {
    return this.gameData.slice().sort((a, b) => b.wins - a.wins);
  }
}
