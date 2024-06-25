import { NgModule } from '@angular/core';
import { CollectionsRoutingModule } from './collections-routing.module';
import { TableComponent } from './collections-home/table/table.component';
import { CollectionsHomeComponent } from './collections-home/collections-home.component';
import { BiographyComponent } from './collections-home/biography/biography.component';
import { CompaniesComponent } from './collections-home/companies/companies.component';
import { PartnersComponent } from './collections-home/partners/partners.component';
import { TabsComponent } from './collections-home/tabs/tabs.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TableComponent,
    CollectionsHomeComponent,
    BiographyComponent,
    CompaniesComponent,
    PartnersComponent,
    TabsComponent
  ],
  imports: [
    CollectionsRoutingModule,
    SharedModule
  ]
})
export class CollectionsModule { }
