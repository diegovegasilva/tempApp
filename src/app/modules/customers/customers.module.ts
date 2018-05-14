import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { CustomersAddComponent } from './customers-add/customers-add.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersDetailComponent } from './customers-detail/customers-detail.component';

import { CustomersRoutingModule } from './customers-routing.module';

@NgModule({
  imports: [CommonModule, CustomersRoutingModule, SharedModule],
  declarations: [
    CustomersAddComponent,
    CustomersDetailComponent,
    CustomersListComponent
  ]
})
export class CustomersModule {}
