import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dart-preset',
  templateUrl: './dart-preset.component.html',
  styleUrl: './dart-preset.component.scss'
})
export class DartPresetComponent implements OnInit {
  players: string[] = [];
  gameSettings: string[] = [];
  newPlayerName: string = '';
  scoreValue: string = '301';
  gameMode: string = 'singleOut';
  errorMessage: string = '';
  resetButton: boolean = false;
  @Output() gameStarted: EventEmitter<{ players: string[], scoreValue: string, gameMode: string }> = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
    const savedPlayers = localStorage.getItem('players');
    if (savedPlayers) {
      this.players = JSON.parse(savedPlayers);
      this.resetButton = true;
    }
  }

  addPlayer(): void {
    let playerName = this.newPlayerName.trim();
    if (playerName !== '') {
      playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1);
      this.players.push(playerName);
      this.newPlayerName = ''; 
      this.errorMessage = '';
      this.resetButton = true;
    }
    localStorage.setItem('players', JSON.stringify(this.players));
  }
  
  removePlayer(index: number): void {
    if (index >= 0 && index < this.players.length) {
      this.players.splice(index, 1);
    }
    if (this.players.length == 0) {
      this.resetButton = false;
    }
    localStorage.setItem('players', JSON.stringify(this.players));
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
      localStorage.setItem('gameStartedData', JSON.stringify({ players: this.players, scoreValue: this.scoreValue, gameMode: this.gameMode }));
      localStorage.removeItem('gameData');
      this.router.navigate([this.gameMode]);
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

  resetData(): void {
    localStorage.removeItem('gameData');
    localStorage.removeItem('gameStartedData');
    localStorage.removeItem('players');
    window.location.reload()
  }

}
