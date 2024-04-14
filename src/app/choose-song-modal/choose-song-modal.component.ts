import { Component, EventEmitter, Output } from '@angular/core';
import { SoundService } from '../services/sound.service';

interface Player {
  name: string;
  winnerSong: string;
}

@Component({
  selector: 'app-choose-song-modal',
  templateUrl: './choose-song-modal.component.html',
  styleUrl: './choose-song-modal.component.scss'
})

export class ChooseSongModalComponent {

  @Output() songSelected: EventEmitter<string> = new EventEmitter();
  players: Player[] = [];

  isOpen: boolean = false;

  currentPlayerIndex: number = 0;

  songs: { name: string, value: string }[] = [
    { name: 'The Darts Anthem', value: 'default' },
    { name: 'Shakira - Waka Waka', value: 'waka-waka' },
    { name: 'FC Bayern Torhymne', value: 'fc-bayern' },
    { name: 'SV Werder Bremen Toryhymne', value: '500-miles' },
    { name: 'Around The World', value: 'around-the-world' },
    { name: 'Major Tom', value: 'major-tom' },
    { name: 'Never Gonna Give You Up', value: 'never-gonna-give-you-up' },
    { name: 'Samba Do Brasil', value: 'samba-to-brazil' },
    { name: 'So sehen Sieger aus!', value: 'so-sehen-sieger-aus' },
    { name: 'Sweet Victory', value: 'sweet-victory' },
    { name: 'We Are The Champions', value: 'we-are-the-champions' },
  ];

  constructor(private soundService: SoundService) { }

  openModal(index: number): void {
    const savedPlayers = localStorage.getItem('players');
    if (savedPlayers) {
      this.players = JSON.parse(savedPlayers);
    }
    this.currentPlayerIndex = index;
    this.isOpen = true;
  }
  

  closeModal(): void {
    this.isOpen = false;
  }

  selectSong(songValue: string): void {
    this.addWinnerSong(this.currentPlayerIndex, songValue)
    this.soundService.stopSound();
    this.closeModal();
  }

  playSound(event: Event, sound: string): void {
    event.stopPropagation();
      this.soundService.stopSound();
      this.soundService.playSound(`assets/sounds/victory/${sound}.mp3`);
  }

  addWinnerSong(index: number, winnerSong: string): void {
    this.players[index].winnerSong = winnerSong;
    localStorage.setItem('players', JSON.stringify(this.players));
  }
}
