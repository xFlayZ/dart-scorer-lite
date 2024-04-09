import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DartComponent } from './dart/dart.component';

const routes: Routes = [
  { path: '', component: DartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
