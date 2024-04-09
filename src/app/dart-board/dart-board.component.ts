import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dart-board',
  templateUrl: './dart-board.component.html',
  styleUrl: './dart-board.component.scss'
})
export class DartBoardComponent {
  public isHighlighted: boolean = false;

  @Output() thrownNumber = new EventEmitter<string>();

  count(number: string) {
      this.thrownNumber.emit(number);
  }

  addHighlight(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    targetElement.classList.add('highlight');
  }

  removeHighlight(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    targetElement.classList.remove('highlight');
  }
}
