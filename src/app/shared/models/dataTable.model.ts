export interface DataTableColumn {
  label: string;
  key: string;
  type: ColumnType;
  sortable?: boolean;
}

export interface DataTableAction {
  label: string;
  type: ActionType;
  icon?: string;
  color?: ActionButtonColor;
}

export interface TableActionEmit {
  type: string;
  payload: any;
}

export interface DataTableData {
  columns: DataTableColumn[];
  actions: DataTableAction[];
}

export type ColumnType = 'index' | 'value' | 'action';
export type ActionType = 'detail' | 'delete' | 'add';
export type ActionButtonColor = 'primary' | 'accent' | 'warn' | 'disabled';
