import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';

@Injectable()
export class MaterialPaginatorInt extends MatPaginatorIntl {
  firstPageLabel = 'primero';
  itemsPerPageLabel = 'resultados por página';
  lastPageLabel = 'último';
  nextPageLabel = 'siguiente';
  previousPageLabel = 'anterior';

  getRangeLabel = function(page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
  };
}