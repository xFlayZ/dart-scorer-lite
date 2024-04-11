import { Component, Input, OnInit } from '@angular/core';
import { shuffleArray } from '../helpers';
import { GameData } from '../interfaces/game-data.interface';
import { CheckoutDoubleOutService } from '../services/checkout-double-out.service';

@Component({
  selector: 'app-dart-game-double-out',
  templateUrl: './dart-game-double-out.component.html',
  styleUrl: './dart-game-double-out.component.scss'
})
export class DartGameDoubleOutComponent implements OnInit {
  public gameData: GameData[] = [];
  public playerCount = 0;
  public currentPlayerCount = 0;
  public possibleCheckout = '-';
  public lastThrownNumber = "-";
  public inRound = true;
  public winnerModalOpen = false;
  public doubleOut = false;
  public legEnd = false;

  @Input() players: string[] = [];
  @Input() scoreValue = '';

  constructor(private checkoutService: CheckoutDoubleOutService) { }

  ngOnInit(): void {
    const savedGameData = localStorage.getItem('gameData');
    if (savedGameData) {
      const savedData = localStorage.getItem('gameStartedData');
      if (savedData) {
        const { players,scoreValue } = JSON.parse(savedData);
        this.players = players;
        this.scoreValue = scoreValue;
      }
      this.gameData = JSON.parse(savedGameData);
    } else {
      this.setupGame();
    }
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
    this.lastThrownNumber = thrownNumber;
  }

  setupGame() {
      const savedData = localStorage.getItem('gameStartedData');
      if (savedData) {
        const { players, scoreValue } = JSON.parse(savedData);
        this.players = players;
        this.scoreValue = scoreValue;
      }
  
      const scoreValueNum = parseInt(this.scoreValue, 10);
      const shuffledPlayers = shuffleArray(this.players);
  
      this.gameData = shuffledPlayers.map(player => ({
        player: player,
        score: scoreValueNum,
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
      localStorage.setItem('gameData', JSON.stringify(this.gameData));
  }

  nextRound() {
    const scoreValueNum = parseInt(this.scoreValue, 10);

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
          player.score = scoreValueNum;
        }
      });

      if (this.gameData[0]) {
        this.gameData[0].game++;
      }

      this.playerCount = this.gameData.length - 1;
    }

    this.doubleOut = false;
    this.legEnd = false;
    localStorage.setItem('gameData', JSON.stringify(this.gameData));
  }

  nextPlayer() {
    const currentPlayer = this.gameData[this.currentPlayerCount];

    if (currentPlayer.score === 0 && this.doubleOut) {
      this.winnerModalOpen = true;
    } else {
      if (currentPlayer.score <= 1) {
        this.deleteLastDart();
        this.deleteLastDart();
        this.deleteLastDart();
      } 
      if (currentPlayer.score <= 1 && !this.doubleOut) {
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
    localStorage.setItem('gameData', JSON.stringify(this.gameData));
  }

  calcScore(thrownNumber: string) {
    const currentPlayer = this.gameData[this.currentPlayerCount];
    const multiplier = thrownNumber.charAt(0);
    const number = (multiplier === 'T' || multiplier === 'D') ? thrownNumber.slice(1) : thrownNumber;
    const multiplierFactor = (multiplier === 'T') ? 3 : (multiplier === 'D') ? 2 : 1;
    const score = parseInt(number) * multiplierFactor;

    currentPlayer.roundTotal += score;
    currentPlayer.score -= score;

    if (currentPlayer.score === 0 && multiplierFactor === 2 || currentPlayer.score === 0 && parseInt(number) === 50) {
      this.doubleOut = true;
    }

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

        if (currentPlayer.score === 0 && multiplierFactor === 2 || currentPlayer.score === 0 && parseInt(number) === 50) {
          this.doubleOut = false;
        }

        currentPlayer.roundTotal -= parseInt(number) * multiplierFactor;
        currentPlayer.score += parseInt(number) * multiplierFactor;
        currentPlayer[darts[filledDartIndex]] = '-';
        this.calculateCheckoutCurrentPlayer();
    }
    this.inRound = true;

    localStorage.setItem('gameData', JSON.stringify(this.gameData));
}


  closeWinnerModal() {
    const currentPlayer = this.gameData[this.currentPlayerCount];
    currentPlayer.wins += 1;
    this.legEnd = true;
    this.winnerModalOpen = false;
    localStorage.setItem('gameData', JSON.stringify(this.gameData));
  }

  calculateCheckoutCurrentPlayer() {
    const currentPlayer = this.gameData[this.currentPlayerCount];
    const score = currentPlayer.score;
    let checkout = this.checkoutService.getCheckout(score);

    if (currentPlayer.thirdDart !== '-') {
      checkout = '';
    } else if (currentPlayer.secondDart !== '-') {
      checkout = this.checkoutService.getOneDartCheckout(score);
    } else if (currentPlayer.firstDart !== '-') {
      checkout = this.checkoutService.getTwoDartsCheckout(score);
    }
    
    this.possibleCheckout = (checkout !== '') ? checkout : "-";
  }

  get sortedGameData() {
    return this.gameData.slice().sort((a, b) => b.wins - a.wins);
  }

  updateDartValue(dartType: string) {
    const currentPlayer = this.gameData[this.currentPlayerCount];
    if (currentPlayer[dartType] != "-") {

      let updateDartValue = "-"

      if (dartType == "firstDart") {
        updateDartValue = currentPlayer.firstDart
      } else if (dartType == "secondDart") {
        updateDartValue = currentPlayer.secondDart
      } else if (dartType == "thirdDart") {
        updateDartValue = currentPlayer.thirdDart
      }

      let multiplier = updateDartValue.charAt(0);
      let number = (multiplier === 'T' || multiplier === 'D') ? updateDartValue.slice(1) : updateDartValue;
      let multiplierFactor = (multiplier === 'T') ? 3 : (multiplier === 'D') ? 2 : 1;
      let score = parseInt(number) * multiplierFactor;
  
      currentPlayer.roundTotal -= score;
      currentPlayer.score += score;

      multiplier = this.lastThrownNumber.charAt(0);
      number = (multiplier === 'T' || multiplier === 'D') ? this.lastThrownNumber.slice(1) : this.lastThrownNumber;
      multiplierFactor = (multiplier === 'T') ? 3 : (multiplier === 'D') ? 2 : 1;
      score = parseInt(number) * multiplierFactor;
  
      currentPlayer.roundTotal += score;
      currentPlayer.score -= score;

      currentPlayer[dartType] = this.lastThrownNumber;
      localStorage.setItem('gameData', JSON.stringify(this.gameData));
    }
  }
}
