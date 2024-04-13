import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';
import { GameData } from '../interfaces/game-data.interface';
import { shuffleArray } from '../helpers';
import { TextToSpeechService } from '../services/text-to-speech.service';
import { SoundService } from '../services/sound.service';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-dart-game-single-out',
  templateUrl: './dart-game-single-out.component.html',
  styleUrls: ['./dart-game-single-out.component.scss']
})

export class DartGameSingleOutComponent implements OnInit {
  public gameData: GameData[] = [];
  public playerCount = 0;
  public currentPlayerCount = 0;
  public previousPlayerCount = 0;
  public lastRoundScore = 0;
  public lastThrownNumber = "-";
  public possibleCheckout = '-';
  public inRound = true;
  public winnerModalOpen = false;
  public legEnd = false;
  public isOneActivePlayer = true;
  public speakToTextEnabled = true;
  public playSoundEnabled = true;
  public animationEnabled = true;
  public isSettingsModalOpen = false;

  closeModalEvent = new EventEmitter<void>();
  @Input() players: string[] = [];
  @Input() scoreValue = '';

  constructor(private checkoutService: CheckoutService, private textToSpeechService: TextToSpeechService, private soundService: SoundService) { }

  ngOnInit(): void {
    this.loadSettingsFromLocalStorage();
    this.setupGame();
  }

  onThrownNumberChange(thrownNumber: string) {
    if (this.inRound && !this.legEnd) {
      const currentPlayer = this.gameData[this.currentPlayerCount];
      const darts = ['firstDart', 'secondDart', 'thirdDart'];
      const emptyDartIndex = darts.findIndex(dart => currentPlayer[dart] === '-');
      
      if (emptyDartIndex !== -1) {
        this.calcScore(thrownNumber);
        currentPlayer[darts[emptyDartIndex]] = thrownNumber;
        this.calculateCheckoutCurrentPlayer();

        this.specialThrownSounds(thrownNumber);
        
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
      game: 0,
      isActive: true
    }));

    this.playerCount = this.players.length - 1;
    localStorage.setItem('gameData', JSON.stringify(this.gameData));

    if (this.speakToTextEnabled) {
      this.speakText();
    }
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
    this.legEnd = false;
    localStorage.setItem('gameData', JSON.stringify(this.gameData));

    const currentPlayer = this.gameData[this.currentPlayerCount];

    if (!currentPlayer.isActive) {
      this.nextPlayer()
    }

    if (this.speakToTextEnabled && currentPlayer.isActive) {
      this.speakText();
    }
  }

  nextPlayer() {
    let currentPlayer = this.gameData[this.currentPlayerCount];

    if (currentPlayer.score === 0) {
      this.winnerModalOpen = true;
      this.celebrate(500);
      this.playSound("victory");
    } else {
      if (currentPlayer.score < 0) {
        this.deleteLastDart();
        this.deleteLastDart();
        this.deleteLastDart();
      }
      if (this.lastRoundScore > currentPlayer.highestRound) {
        if (this.lastRoundScore > 180) {
          currentPlayer.highestRound = 180
        } else {
          currentPlayer.highestRound = this.lastRoundScore
        }
      }
      this.lastRoundScore = 0;
      currentPlayer.roundAverage = parseFloat((currentPlayer.roundTotal / currentPlayer.round).toFixed(2));

      if (currentPlayer.isActive) {
        currentPlayer.round += 1;
        this.previousPlayerCount = this.currentPlayerCount
      }
      
      this.currentPlayerCount = (this.playerCount > this.currentPlayerCount) ? this.currentPlayerCount + 1 : 0;

      currentPlayer = this.gameData[this.currentPlayerCount];

      if (!currentPlayer.isActive) {
        this.nextPlayer()

      }

      currentPlayer.firstDart = '-';
      currentPlayer.secondDart = '-';
      currentPlayer.thirdDart = '-';

    }
    this.calculateCheckoutCurrentPlayer();
    if (this.speakToTextEnabled && currentPlayer.isActive) {
      this.speakText();
    }
    this.inRound = true;
    localStorage.setItem('gameData', JSON.stringify(this.gameData));
  }

  backToLastPlayer() { 
    // delete last darts currentPlayer
    this.deleteLastDart();
    this.deleteLastDart();
    this.deleteLastDart();

    // go back to last player
    this.currentPlayerCount = this.previousPlayerCount

    // get currentPlayer
    const currentPlayer = this.gameData[this.currentPlayerCount];

    // remove round
    currentPlayer.round -= 1;

    // set inRound false
    this.inRound = false;
  }

  calcScore(thrownNumber: string) {
    const multiplier = thrownNumber.charAt(0);
    const number = (multiplier === 'T' || multiplier === 'D') ? thrownNumber.slice(1) : thrownNumber;
    const multiplierFactor = (multiplier === 'T') ? 3 : (multiplier === 'D') ? 2 : 1;
    const score = parseInt(number) * multiplierFactor;

    this.lastRoundScore += score;
    this.gameData[this.currentPlayerCount].roundTotal += score;
    this.gameData[this.currentPlayerCount].score -= score;
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

        this.lastRoundScore -= parseInt(number) * multiplierFactor;
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
    localStorage.setItem('gameData', JSON.stringify(this.gameData));
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

  checkIfOneActivePlayer() {
    this.isOneActivePlayer = this.gameData.some(player => player.isActive);
  }

  speakText(): void {
    const currentPlayer = this.gameData[this.currentPlayerCount];

    let possibleCheckoutText = ``
    if (this.possibleCheckout != "-") {
      possibleCheckoutText = `Möglicher Checkout: ${this.possibleCheckout}`
    }

    let textToSpeak = `Aktueller Spieler: ${currentPlayer.player} Verbleibender Score: ${currentPlayer.score} ${possibleCheckoutText}`;

    if (currentPlayer.score == 0) {
      textToSpeak = `${currentPlayer.player} hat die Runde Gewonnen!`
    }

    this.textToSpeechService.speak(textToSpeak);
  }

  toggleSpeakToTextEnabled(): void {
    this.speakToTextEnabled = !this.speakToTextEnabled;
    localStorage.setItem('speakToTextEnabled', String(this.speakToTextEnabled));
  }

  
  togglePlaySoundEnabled(): void {
    this.playSoundEnabled = !this.playSoundEnabled;
    localStorage.setItem('playSoundEnabled', String(this.playSoundEnabled));
  }

  toggleAnimationEnabled(): void {
    this.animationEnabled = !this.animationEnabled;
    localStorage.setItem('animationEnabled', String(this.animationEnabled));
  }

  playSound(sound: string): void {
    if (this.playSoundEnabled) {
      this.soundService.stopSound();
      this.soundService.playSound(`assets/sounds/${sound}.mp3`);
    }
  }

  specialThrownSounds(thrownNumber: string) {
    const currentPlayer = this.gameData[this.currentPlayerCount];
    if (this.lastRoundScore == 180 && currentPlayer.thirdDart != "-") {
      this.playSound("score-180");
      this.celebrate(500);
    } else if (this.lastRoundScore >= 100 && currentPlayer.thirdDart != "-") {
      this.playSound("nice-shot");
      this.celebrate(125);
    } else if (this.lastRoundScore == 0 && currentPlayer.thirdDart != "-") {
      this.playSound("fail")
    }

      if (thrownNumber == "50") {
        this.playSound("clap");
        this.celebrate(125);
      }
      if (thrownNumber == "T20" && currentPlayer.thirdDart == "-") {
        this.playSound("clap");
        this.celebrate(125);
      }
  }

  openSettingsModal() {
    this.isSettingsModalOpen = true;
  }

  closeModal() {
    this.closeModalEvent.emit();
    this.isSettingsModalOpen = false;
  }

  celebrate(particleCount: number) {
    if (this.animationEnabled) {
      const duration = 5000; // in milliseconds
  
      confetti({
        particleCount: particleCount,
        spread: 320,
        origin: { y: 0.4 },
      });
    
      // Clear confetti after a certain duration
      setTimeout(() => confetti.reset(), duration);
    }
  }

  loadSettingsFromLocalStorage(): void {
    const speakToTextEnabled = localStorage.getItem('speakToTextEnabled');
    if (speakToTextEnabled !== null) {
      this.speakToTextEnabled = speakToTextEnabled === 'true';
    }
  
    const playSoundEnabled = localStorage.getItem('playSoundEnabled');
    if (playSoundEnabled !== null) {
      this.playSoundEnabled = playSoundEnabled === 'true';
    }
  
    const animationEnabled = localStorage.getItem('animationEnabled');
    if (animationEnabled !== null) {
      this.animationEnabled = animationEnabled === 'true';
    }
  }
}
