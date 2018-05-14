export interface Alert {
  type: AlertType;
  message: string;
  duration?: number;
  autoHide?: boolean;
}

export type AlertType = 'success' | 'info' | 'warning' | 'danger';
