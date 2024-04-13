import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
  }

  playSound(soundUrl: string): void {
    this.audio.src = soundUrl;
    this.audio.load();
    this.audio.play();
  }

  stopSound(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
