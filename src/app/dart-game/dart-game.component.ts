import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-dart-game',
  templateUrl: './dart-game.component.html',
  styleUrl: './dart-game.component.scss'
})
export class DartGameComponent implements OnInit {

  public gameData: { player: string, score: number, wins: number, roundAverage: number, totalAverage: number, highestRound: number, firstDart: string, secondDart: string, thirdDart: string, roundTotal: number, round: number, game: number }[] = [];

  public playerCount = 0;
  public currentPlayerCount = 0;
  public winnerModalOpen: boolean = false;
  public possibleCheckout: string = '-';
  public inRound = true;

  @Input() players: string[] = [];
  @Input() mode: string = '';
  @Input() difficulty: string = '';

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.setupGame(this.players, this.mode, this.difficulty)
  }

  // Ändere thrownNumber und berechne den Score + setze first-, second- und thirdDart

  onThrownNumberChange(thrownNumber: string) {

      if (this.inRound) {
        if (this.gameData[this.currentPlayerCount].firstDart == '-') {
          this.calcScore(thrownNumber)
          this.gameData[this.currentPlayerCount].firstDart = thrownNumber
          this.calculateCheckoutCurrentPlayer();
        } else if (this.gameData[this.currentPlayerCount].secondDart == '-') {
          this.calcScore(thrownNumber)
          this.gameData[this.currentPlayerCount].secondDart = thrownNumber
          this.calculateCheckoutCurrentPlayer();
        } else if (this.gameData[this.currentPlayerCount].thirdDart == '-') {
          this.calcScore(thrownNumber)
          this.gameData[this.currentPlayerCount].thirdDart = thrownNumber
          this.possibleCheckout = "-"
          this.inRound = false;
          
        }
      }

    if (this.gameData[this.currentPlayerCount].score <= 0) {
      this.inRound = false;
    }
  }

  // Game Setup

  setupGame(players: string[], mode: string, difficulty: string) {
    const modeNum = parseInt(mode, 10);

    const shuffledPlayers = this.shuffleArray(players);

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

    this.playerCount = players.length - 1;
}

shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Neue Runde

nextRound() {
  const modeNum = parseInt(this.mode, 10);
  // Überprüfen, ob das gameData-Array nicht leer ist
  if (this.gameData && this.gameData.length > 0) {
    // Den ersten Spieler als letzten Spieler in der Reihenfolge verschieben
    const lastPlayer = this.gameData.shift();
    if (lastPlayer) {
      this.gameData.push(lastPlayer);
    }

    // Aktualisieren der Rundennummer für alle Spieler
    this.gameData.forEach(player => {
      if (player) {
        player.round++;
        player.firstDart = '-'
        player.secondDart = '-'
        player.thirdDart = '-'
        player.score = modeNum
      }
    });

    // Aktualisieren der Spielernummer für den ersten Spieler
    if (this.gameData[0]) {
      this.gameData[0].game++;
    }

    // Aktualisieren der Spieleranzahl
    this.playerCount = this.gameData.length - 1;
  }
}



// Nächster Spieler

nextPlayer() {
  if (this.gameData[this.currentPlayerCount].score == 0) {
    this.winnerModalOpen = true;
  } else {
    if (this.gameData[this.currentPlayerCount].score < 0) {
      this.deleteLastDart()
      this.deleteLastDart()
      this.deleteLastDart()
    }
    this.gameData[this.currentPlayerCount].firstDart = '-'
    this.gameData[this.currentPlayerCount].secondDart = '-'
    this.gameData[this.currentPlayerCount].thirdDart = '-'
    this.gameData[this.currentPlayerCount].round += 1
  
    if (this.playerCount > this.currentPlayerCount) {
      this.currentPlayerCount = this.currentPlayerCount + 1
    } else {
      this.currentPlayerCount = 0
    }
  }
  this.calculateCheckoutCurrentPlayer();
  this.inRound = true;
}

// Score Berechnung

calcScore(thrownNumber: string) {
  // Extrahiere den Multiplikator und die Zahl aus der Eingabe
  const multiplier = thrownNumber.charAt(0); // Erstes Zeichen für Multiplikator
  const number = (multiplier === 'T' || multiplier === 'D') ? thrownNumber.slice(1) : thrownNumber; // Wenn Multiplikator vorhanden, extrahiere die Zahl, sonst ist die Eingabe die Zahl selbst

  // Umwandlung des Multiplikators in einen Multiplikationsfaktor
  let multiplierFactor = 1; // Standard ist einfach
  if (multiplier === 'T') {
    multiplierFactor = 3;
  } else if (multiplier === 'D') {
    multiplierFactor = 2;
  }

  // Berechne den Score basierend auf dem Multiplikator und der Zahl
  const score = parseInt(number) * multiplierFactor;

  // Speichere den Score in this.gameData[this.currentPlayerCount].score
  this.gameData[this.currentPlayerCount].score -= score;
}

// Score Berechnung

calcRemoveScore(thrownNumber: string) {
  // Extrahiere den Multiplikator und die Zahl aus der Eingabe
  const multiplier = thrownNumber.charAt(0); // Erstes Zeichen für Multiplikator
  const number = (multiplier === 'T' || multiplier === 'D') ? thrownNumber.slice(1) : thrownNumber; // Wenn Multiplikator vorhanden, extrahiere die Zahl, sonst ist die Eingabe die Zahl selbst

  // Umwandlung des Multiplikators in einen Multiplikationsfaktor
  let multiplierFactor = 1; // Standard ist einfach
  if (multiplier === 'T') {
    multiplierFactor = 3;
  } else if (multiplier === 'D') {
    multiplierFactor = 2;
  }

  // Berechne den Score basierend auf dem Multiplikator und der Zahl
  const score = parseInt(number) * multiplierFactor;

  // Speichere den Score in this.gameData[this.currentPlayerCount].score
  this.gameData[this.currentPlayerCount].score += score;
}

// Letzten Dart löschen

deleteLastDart() {
  if (this.gameData[this.currentPlayerCount].thirdDart != '-') {
    this.calcRemoveScore(this.gameData[this.currentPlayerCount].thirdDart)
    this.calculateCheckoutCurrentPlayer();
    this.gameData[this.currentPlayerCount].thirdDart = '-'
  } else if(this.gameData[this.currentPlayerCount].secondDart != '-') {
    this.calcRemoveScore(this.gameData[this.currentPlayerCount].secondDart)
    this.calculateCheckoutCurrentPlayer();
    this.gameData[this.currentPlayerCount].secondDart = '-'
  } else if (this.gameData[this.currentPlayerCount].firstDart != '-') {
    this.calcRemoveScore(this.gameData[this.currentPlayerCount].firstDart)
    this.calculateCheckoutCurrentPlayer();
    this.gameData[this.currentPlayerCount].firstDart = '-'
  }
  this.inRound = true;
}

// Modal schließen

closeWinnerModal() {
  this.gameData[this.currentPlayerCount].wins += 1
  this.nextRound()
  //console.log(this.gameData)
  this.winnerModalOpen = false;
}

// Überprüfe Checkout

calculateCheckoutCurrentPlayer() {
    const score = this.gameData[this.currentPlayerCount].score;
    let checkout = this.checkoutService.getCheckout(score);

    if (this.gameData[this.currentPlayerCount].secondDart !== '-') {
      checkout = this.checkoutService.getOneDartCheckout(score);
    } else if (this.gameData[this.currentPlayerCount].firstDart !== '-') {
      checkout = this.checkoutService.getTwoDartsCheckout(score);
    }
    
    // Speichere den Checkout für den aktuellen Spieler
    if (checkout !== '') {
      this.possibleCheckout = checkout;
    } else {
      this.possibleCheckout = "-"
    }
    
}

}
