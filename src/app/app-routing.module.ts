import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DartPresetComponent } from './dart-preset/dart-preset.component';
import { DartComponent } from './dart/dart.component';
import { DartGameComponent } from './dart-game/dart-game.component';

const routes: Routes = [
  { path: '', component: DartComponent },
  { path: 'board', component: DartGameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
