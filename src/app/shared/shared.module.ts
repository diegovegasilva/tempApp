import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatExpansionModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatPaginatorIntl,
  MatDialogModule,
  MatIconModule
} from '@angular/material';

import { MaterialPaginatorInt } from './classes/material-paginator-int';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DataTableComponent,
    ConfirmDialogComponent
  ],
  declarations: [DataTableComponent, ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent],
  providers: [{ provide: MatPaginatorIntl, useClass: MaterialPaginatorInt }]
})
export class SharedModule {}
