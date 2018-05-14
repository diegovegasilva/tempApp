import { Action } from '@ngrx/store';
import { Error } from '../../shared/models/error.model';
import { Alert } from '../../shared/models/alert.model';

export const THROW_ERROR = '[NOTIFICATION] ERROR THROW';
export const ADD_ERROR = '[NOTIFICATION] ERROR ADD';
export const SHOW_ALERT = '[NOTIFICATION] ALERT SHOW';
export const ADD_ALERT = '[NOTIFICATION] ALERT ADD';
export const REMOVE_ALERT = '[NOTIFICATION] ALERT REMOVE';

export class ErrorThrow implements Action {
  readonly type = THROW_ERROR;
  constructor(public payload: Error) {}
}
export class ErrorAdd implements Action {
  readonly type = ADD_ERROR;
  constructor(public payload: Error) {}
}

export class AlertShow implements Action {
  readonly type = SHOW_ALERT;
  constructor(public payload: Alert) {}
}

export class AlertAdd implements Action {
  readonly type = ADD_ALERT;
  constructor(public payload: Alert) {}
}

export class AlertRemove implements Action {
  readonly type = REMOVE_ALERT;
  constructor() {}
}

export type Actions = ErrorThrow | ErrorAdd | AlertAdd | AlertRemove;
