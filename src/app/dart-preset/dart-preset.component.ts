import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dart-preset',
  templateUrl: './dart-preset.component.html',
  styleUrl: './dart-preset.component.scss'
})
export class DartPresetComponent {
  players: string[] = [];
  gameSettings: string[] = [];
  newPlayerName: string = '';
  scoreValue: string = '301';
  gameMode: string = 'singleOut';
  errorMessage: string = '';
  @Output() gameStarted: EventEmitter<{ players: string[], scoreValue: string, gameMode: string }> = new EventEmitter();

  addPlayer(): void {
    const playerName = this.newPlayerName.trim();
    if (playerName !== '') {
      this.players.push(playerName);
      this.newPlayerName = ''; 
      this.errorMessage = '';
    }
  }

  removePlayer(index: number): void {
    if (index >= 0 && index < this.players.length) {
      this.players.splice(index, 1);
    }
  }

  updateParticipantsList(): void {
    const participantsList = document.querySelector('.card-body ul'); 
  
    if (participantsList) {
      participantsList.innerHTML = '';
  
      this.players.forEach(player => {
        const listItem = document.createElement('li'); 
        listItem.textContent = player; 
        participantsList.appendChild(listItem);
      });
    } else {
      console.error('Teilnehmerliste nicht gefunden.'); 
    }
  }

  startGame(): void {
    if(this.players.length > 0) {
      this.gameStarted.emit({ players: this.players, scoreValue: this.scoreValue, gameMode: this.gameMode });
    } else {
      this.errorMessage = "Es muss mindestens einen Spieler geben!";
    }    
  }

  updateScoreValue(scoreValue: string): void {
    this.scoreValue = scoreValue;
  }

  updateGameMode(gameMode: string): void {
    this.gameMode = gameMode;
  }

}
