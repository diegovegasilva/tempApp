import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Injectable()
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmDialog(data) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: data
    });
  }
}
