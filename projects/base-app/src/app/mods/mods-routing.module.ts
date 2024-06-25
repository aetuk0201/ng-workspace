import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModsHomeComponent } from './mods-home/mods-home.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: ModsHomeComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ModsRoutingModule { }
