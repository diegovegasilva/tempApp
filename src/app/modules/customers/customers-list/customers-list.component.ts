import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as customerActions from '../../../store/actions/customer.actions';
import { getCustomers } from '../../../store/reducers';
import { Router } from '@angular/router';

import { DialogService } from '../../../core/services/dialog.service';
import { DataTableData } from '../../../shared/models/dataTable.model';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit, OnDestroy {
  customers$;
  dialogSub;
  tableConfig: DataTableData;

  constructor(
    private store: Store<any>,
    private router: Router,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.store.dispatch(new customerActions.CustomerFetchAll());
    this.customers$ = this.store.select(getCustomers);
    this.tableConfig = {
      columns: [
        { label: '#', key: '#', type: 'index' },
        { label: 'Nombre', key: 'name', type: 'value', sortable: true },
        { label: 'email', type: 'value', key: 'email', sortable: true },
        { label: 'acciones', type: 'action', key: 'action' }
      ],
      actions: [
        { label: 'Ver', icon: 'visibility', type: 'detail', color: 'primary' },
        { label: 'Borrar', icon: 'delete', type: 'delete', color: 'accent' }
      ]
    };
  }

  switchAction($event) {
    switch ($event.type) {
      case 'delete':
        this.deletePromt($event.payload.id);
        break;
      case 'detail':
        this.gotoDetail($event.payload);
        break;
    }
  }
  gotoDetail(customer) {
    this.router.navigate(['/customers', customer.id]);
  }

  deletePromt(customerId) {
    console.log(customerId);
    this.dialogSub = this.dialogService
      .openConfirmDialog({ name: 'pedro' })
      .afterClosed()
      .subscribe(result => {
        if (result === 'delete') {
          this.deleteCustomer(customerId);
        }
      });
  }

  deleteCustomer(customerId) {
    this.store.dispatch(new customerActions.CustomerDelete(customerId));
    console.log(`deleting customer ${customerId}`);
  }

  ngOnDestroy() {
    if (this.dialogSub) {
      this.dialogSub.unsubscribe();
    }
  }
}
