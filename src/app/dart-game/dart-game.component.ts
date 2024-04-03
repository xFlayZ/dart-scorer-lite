import { Component, Input, OnInit } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';
import { GameData } from '../interfaces/game-data.interface';

@Component({
  selector: 'app-dart-game',
  templateUrl: './dart-game.component.html',
  styleUrls: ['./dart-game.component.scss']
})

export class DartGameComponent implements OnInit {
  public gameData: GameData[] = [];
  public playerCount = 0;
  public currentPlayerCount = 0;
  public winnerModalOpen = false;
  public possibleCheckout = '-';
  public inRound = true;

  @Input() players: string[] = [];
  @Input() mode = '';
  @Input() difficulty = '';

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.setupGame();
  }

  onThrownNumberChange(thrownNumber: string) {
    if (this.inRound) {
      const currentPlayer = this.gameData[this.currentPlayerCount];
      const darts = ['firstDart', 'secondDart', 'thirdDart'];
      const emptyDartIndex = darts.findIndex(dart => currentPlayer[dart] === '-');
      
      if (emptyDartIndex !== -1) {
        this.calcScore(thrownNumber);
        currentPlayer[darts[emptyDartIndex]] = thrownNumber;
        this.calculateCheckoutCurrentPlayer();
        
        if (emptyDartIndex === 2 || currentPlayer.score <= 0) {
          this.inRound = false;
        }
      }
    }
  }

  setupGame() {
    const modeNum = parseInt(this.mode, 10);
    const shuffledPlayers = this.shuffleArray(this.players);

    this.gameData = shuffledPlayers.map(player => ({
      player: player,
      score: modeNum,
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

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  nextRound() {
    const modeNum = parseInt(this.mode, 10);

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
          player.score = modeNum;
        }
      });

      if (this.gameData[0]) {
        this.gameData[0].game++;
      }

      this.playerCount = this.gameData.length - 1;
    }
  }

  nextPlayer() {
    const currentPlayer = this.gameData[this.currentPlayerCount];

    if (currentPlayer.score === 0) {
      this.winnerModalOpen = true;
    } else {
      if (currentPlayer.score < 0) {
        this.deleteLastDart();
        this.deleteLastDart();
        this.deleteLastDart();
      }
      currentPlayer.roundAverage = parseFloat((currentPlayer.roundTotal / currentPlayer.round).toFixed(2));
      currentPlayer.firstDart = '-';
      currentPlayer.secondDart = '-';
      currentPlayer.thirdDart = '-';
      currentPlayer.round += 1;

      this.currentPlayerCount = (this.playerCount > this.currentPlayerCount) ? this.currentPlayerCount + 1 : 0;
    }
    this.calculateCheckoutCurrentPlayer();
    this.inRound = true;
  }

  calcScore(thrownNumber: string) {
    const multiplier = thrownNumber.charAt(0);
    const number = (multiplier === 'T' || multiplier === 'D') ? thrownNumber.slice(1) : thrownNumber;
    const multiplierFactor = (multiplier === 'T') ? 3 : (multiplier === 'D') ? 2 : 1;
    const score = parseInt(number) * multiplierFactor;

    this.gameData[this.currentPlayerCount].roundTotal += score;
    this.gameData[this.currentPlayerCount].score -= score;
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

        currentPlayer.score += parseInt(number) * multiplierFactor;
        currentPlayer[darts[filledDartIndex]] = '-';
        this.calculateCheckoutCurrentPlayer();
    }
    this.inRound = true;
}


  closeWinnerModal() {
    const currentPlayer = this.gameData[this.currentPlayerCount];
    currentPlayer.wins += 1;
    this.nextRound();
    this.winnerModalOpen = false;
  }

  calculateCheckoutCurrentPlayer() {
    const currentPlayer = this.gameData[this.currentPlayerCount];
    const score = currentPlayer.score;
    let checkout = this.checkoutService.getCheckout(score);

    if (currentPlayer.secondDart !== '-') {
      checkout = this.checkoutService.getOneDartCheckout(score);
    } else if (currentPlayer.firstDart !== '-') {
      checkout = this.checkoutService.getTwoDartsCheckout(score);
    }
    
    this.possibleCheckout = (checkout !== '') ? checkout : "-";
  }

  get sortedGameData() {
    return this.gameData.slice().sort((a, b) => b.wins - a.wins);
  }
}
