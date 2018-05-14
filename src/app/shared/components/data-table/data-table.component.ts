import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  OnDestroy,
  EventEmitter
} from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { DataTableData, TableActionEmit } from '../../models/dataTable.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnDestroy {
  @Input() dataSource$: Observable<any>;
  @Input() config: DataTableData;
  @Input() sortable?: boolean;
  @Input() paginate?: boolean;
  @Input() perPage?: number;
  @Output() action = new EventEmitter<TableActionEmit>();
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  dataSub: Subscription;
  dataSource: MatTableDataSource<any>;
  columns: string[];
  resultsPerPage: number;
  constructor() {}

  ngOnInit() {
    this.dataSub = this.dataSource$.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.columns = _.map(this.config.columns, 'key');
    this.resultsPerPage = this.perPage || 10;
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }

  emitAction(type, payload) {
    this.action.emit({
      type: type,
      payload: payload
    });
  }
}
