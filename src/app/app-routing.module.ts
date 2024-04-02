import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DartPresetComponent } from './dart-preset/dart-preset.component';
import { DartComponent } from './dart/dart.component';

const routes: Routes = [
  { path: '', component: DartPresetComponent },
  { path: 'board', component: DartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
