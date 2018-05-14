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
import { FormGeneratorComponent } from './components/form-generator/form-generator.component';
@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule, ReactiveFormsModule
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
    ConfirmDialogComponent,
    FormGeneratorComponent
  ],
  declarations: [DataTableComponent, ConfirmDialogComponent, FormGeneratorComponent],
  entryComponents: [ConfirmDialogComponent],
  providers: [{ provide: MatPaginatorIntl, useClass: MaterialPaginatorInt }]
})
export class SharedModule {}
