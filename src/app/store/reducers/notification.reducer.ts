import * as fromActions from '../actions/notification.actions';
import * as _ from 'lodash';

import { Error } from '../../shared/models/error.model';

export interface State {
  errors: Error[];
  alert: Error;
}

const initialState: State = {
  errors: [],
  alert: undefined
};

export function notificationReducer(
  state: State = initialState,
  action: fromActions.Actions
): State {
  switch (action.type) {
    case fromActions.ADD_ERROR:
      return Object.assign({}, state, {
        errors: [...state.errors, action.payload],
        alert: state.alert
      });
    case fromActions.ADD_ALERT:
      return Object.assign({}, state, {
        errors: state.errors,
        alert: action.payload
      });
    case fromActions.REMOVE_ALERT:
      return Object.assign({}, state, {
        errors: state.errors,
        alert: undefined
      });
    default:
      return state;
  }
}

// slices of state
export const getErrors = (state: State) => state.errors;
export const getAlert = (state: State) => state.alert;
