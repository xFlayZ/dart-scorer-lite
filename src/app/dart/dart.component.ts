import { Component } from '@angular/core';

@Component({
  selector: 'app-dart',
  templateUrl: './dart.component.html',
  styleUrl: './dart.component.scss'
})
export class DartComponent {
  gameStartedData: { players: string[], scoreValue: string, gameMode: string } | null = null;

  receiveGameStarted(event: { players: string[], scoreValue: string, gameMode: string }): void {
    this.gameStartedData = event;
  }
}
