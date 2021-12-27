import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeComponent } from './theme.component';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: "", component: ThemeComponent }
]

@NgModule({
  declarations: [
    ThemeComponent
  ],
  imports: [
    RouterModule,
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class ThemeModule { }
