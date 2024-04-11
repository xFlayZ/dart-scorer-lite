import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DartPresetComponent } from './dart-preset/dart-preset.component';
import { DartGameSingleOutComponent } from './dart-game-single-out/dart-game-single-out.component';
import { DartGameDoubleOutComponent } from './dart-game-double-out/dart-game-double-out.component';
import { DartGameAroundTheClockComponent } from './dart-game-around-the-clock/dart-game-around-the-clock.component';

const routes: Routes = [
  { path: '', component: DartPresetComponent },
  { path: 'singleOut', component: DartGameSingleOutComponent },
  { path: 'doubleOut', component: DartGameDoubleOutComponent },
  { path: 'aroundTheClock', component: DartGameAroundTheClockComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
