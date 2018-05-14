import * as fromActions from '../actions/user.actions';
import * as _ from 'lodash';

import { User } from '../../shared/models/user.model';

export interface State {
  user: User;
}

const initialState: State = {
  user: {
    isAuth: false,
    id: undefined,
    userName: undefined,
    userRol: undefined,
    url: undefined
  }
};

export function userReducer(
  state: State = initialState,
  action: fromActions.Actions
): State {
  switch (action.type) {
    case fromActions.USER_STORE_ADD:
      return Object.assign({}, state, {
        user: action.payload
      });
    case fromActions.USER_STORE_REMOVE:
      return Object.assign({}, state, {
        user: {
          isAuth: false
        }
      });
    default:
      return state;
  }
}

// slices of state
export const getUser = (state: State) => state.user;
export const getUserAuth = (state: State) => state.user.isAuth;
