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
  isHovered: boolean = false;
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  displayedSongs: { name: string; value: string }[] = [];

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
    { name: 'Dreamers', value: 'dreamers' },
    { name: 'Ein Hoch auf uns', value: 'ein-hoch-auf-uns' },
    { name: 'Eye of the Tiger (Intro)', value: 'eye-of-the-tiger-intro' },
    { name: 'Eye of the Tiger 2', value: 'eye-of-the-tiger-second' },
    { name: 'Final Fantasy Victory', value: 'final-fantasy' },
    { name: 'Papaoutai', value: 'papaute' },
    { name: 'Pokemon', value: 'pokemon' },
    { name: 'Wavin Flag', value: 'wavin-flag' },
    { name: 'Whenever, Whereever', value: 'whenever-whereever' },
  ];

  constructor(private soundService: SoundService) { }

  openModal(index: number): void {
    const savedPlayers = localStorage.getItem('players');
    if (savedPlayers) {
      this.players = JSON.parse(savedPlayers);
    }
    this.currentPlayerIndex = index;
    this.isOpen = true;

    this.totalPages = Math.ceil(this.songs.length / this.pageSize);
    this.updateDisplayedSongs();
  }
  

  closeModal(): void {
    this.isOpen = false;
    this.soundService.stopSound();
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

  updateDisplayedSongs() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedSongs = this.songs.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedSongs();
    }
  }
}
