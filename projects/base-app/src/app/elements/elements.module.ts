import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementsHomeComponent } from './elements-home/elements-home.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { ElementsRoutingModule } from './elements-routing.module';
import { TimesDirective } from './times.directive';



@NgModule({
  declarations: [
    ElementsHomeComponent,
    PlaceholderComponent,
    TimesDirective
  ],
  imports: [
    CommonModule,
    ElementsRoutingModule
  ]
})
export class ElementsModule { }
