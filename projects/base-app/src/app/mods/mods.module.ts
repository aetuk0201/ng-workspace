import { NgModule } from '@angular/core';
import { ModsHomeComponent } from './mods-home/mods-home.component';
import { ModalComponent } from './modal/modal.component';
import { ModsRoutingModule } from './mods-routing.module';
import { AccordionComponent } from './accordion/accordion.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ModsHomeComponent,
    ModalComponent,
    AccordionComponent
  ],
  imports: [
    // FontAwesomeModule,
    ModsRoutingModule,
    SharedModule
  ]
})
export class ModsModule { }
