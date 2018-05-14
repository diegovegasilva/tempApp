import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersAddComponent } from './customers-add/customers-add.component';
import { CustomersDetailComponent } from './customers-detail/customers-detail.component';

const routes: Routes = [
  { path: '', component: CustomersListComponent },
  { path: 'add', component: CustomersDetailComponent },
  { path: ':id', component: CustomersDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule {}
