import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dart-game',
  templateUrl: './dart-game.component.html',
  styleUrl: './dart-game.component.scss'
})
export class DartGameComponent implements OnInit {

  public gameData: { player: string, score: number, wins: number, roundAverage: number, totalAverage: number, highestRound: number, firstDart: string, secondDart: string, thirdDart: string, roundTotal: number, round: number, game: number }[] = [];

  @Input() players: string[] = [];
  @Input() mode: string = '';
  @Input() difficulty: string = '';

  ngOnInit(): void {
    this.setupGame(this.players, this.mode, this.difficulty)
  }

  // Ändere thrownNumber und berechne den Score + setze first-, second- und thirdDart

  onThrownNumberChange(thrownNumber: string) {
    if (this.gameData[0].firstDart == '-') {
      this.calcScore(thrownNumber)
      this.gameData[0].firstDart = thrownNumber
    } else if (this.gameData[0].secondDart == '-') {
      this.calcScore(thrownNumber)
      this.gameData[0].secondDart = thrownNumber
    } else if (this.gameData[0].thirdDart == '-') {
      this.calcScore(thrownNumber)
      this.gameData[0].thirdDart = thrownNumber
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
}

shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Nächster Spieler

nextPlayer() {
  this.gameData[0].firstDart = '-'
  this.gameData[0].secondDart = '-'
  this.gameData[0].thirdDart = '-'
  this.gameData[0].round += 1
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

  // Speichere den Score in this.gameData[0].score
  this.gameData[0].score -= score;
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

  // Speichere den Score in this.gameData[0].score
  this.gameData[0].score += score;
}

// Letzten Dart löschen

deleteLastDart() {
  if (this.gameData[0].thirdDart != '-') {
    this.calcRemoveScore(this.gameData[0].thirdDart)
    this.gameData[0].thirdDart = '-'
  } else if(this.gameData[0].secondDart != '-') {
    this.calcRemoveScore(this.gameData[0].secondDart)
    this.gameData[0].secondDart = '-'
  } else if (this.gameData[0].firstDart != '-') {
    this.calcRemoveScore(this.gameData[0].firstDart)
    this.gameData[0].firstDart = '-'
  }
}



}
