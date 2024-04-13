import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateTitle();
      });
  }

  private updateTitle() {
    let path = this.router.url.split('/').filter(Boolean).join(' - ');
    switch (path) {
      case "":
        path = "Voreinstellungen";
        break;
      case "singleOut":
        path = "Single Out";
        break;
      case "doubleOut":
        path = "Double Out";
        break;
      case "aroundTheClock":
        path = "Around the Clock";
        break;
    }
    const title = `Dart Scorer - ${path}`;
    document.title = title;
  }
}
