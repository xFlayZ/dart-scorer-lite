import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DartComponent } from './dart/dart.component';
import { DartBoardComponent } from './dart-board/dart-board.component';
import { DartGameDataComponent } from './dart-game-data/dart-game-data.component';
import { DartGameDataButtonsComponent } from './dart-game-data-buttons/dart-game-data-buttons.component';
import { DartPresetComponent } from './dart-preset/dart-preset.component';
import { DartPresetInfoComponent } from './dart-preset-info/dart-preset-info.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { PlayerCardComponent } from './player-card/player-card.component';

@NgModule({
  declarations: [
    AppComponent,
    DartComponent,
    DartBoardComponent,
    DartGameDataComponent,
    DartGameDataButtonsComponent,
    DartPresetComponent,
    DartPresetInfoComponent,
    ErrorMessageComponent,
    PlayerCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
