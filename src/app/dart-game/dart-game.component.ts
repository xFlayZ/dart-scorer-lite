import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dart-game',
  templateUrl: './dart-game.component.html',
  styleUrl: './dart-game.component.scss'
})
export class DartGameComponent implements OnInit {
  
  public playerName = 'Spieler 1';
  public playerScore = 301;
  public playerRound = 3;

  public gameData: { player: string, score: number, wins: number, roundAverage: number, totalAverage: number, highestRound: number, firstDart: string, secondDart: string, thirdDart: string, roundTotal: number, round: number, game: number }[] = [];
  public dartThrownNumber = '0';

  @Input() players: string[] = [];
  @Input() mode: string = '';
  @Input() difficulty: string = '';

  ngOnInit(): void {
    this.setupGame(this.players, this.mode, this.difficulty)
  }

  onThrownNumberChange(thrownNumber: string) {
    this.dartThrownNumber = thrownNumber;
    console.log(thrownNumber)
    if (this.gameData[0].firstDart == '-') {
      console.log("test")
      this.gameData[0].firstDart = thrownNumber
    } else if (this.gameData[0].secondDart == '-') {
      this.gameData[0].secondDart = thrownNumber
    } else if (this.gameData[0].thirdDart == '-') {
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
        round: 0,
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

nextPlayer() {
  console.log(this.gameData[0])
}
}
