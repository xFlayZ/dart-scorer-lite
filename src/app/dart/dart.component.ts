import { Component } from '@angular/core';

@Component({
  selector: 'app-dart',
  templateUrl: './dart.component.html',
  styleUrl: './dart.component.scss'
})
export class DartComponent {
  gameStartedData: { players: string[], mode: string, difficulty: string } | null = null;

  receiveGameStarted(event: { players: string[], mode: string, difficulty: string }): void {
    this.gameStartedData = event;
  }
}
