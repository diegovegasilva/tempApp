import * as fromActions from '../actions/data.actions';

import { Province } from '../../shared/models/province.model';

export interface State {
  provinces: Province[];
}

const initialState: State = {
  provinces: []
};

export function dataReducer(
  state: State = initialState,
  action: fromActions.Actions
): State {
  switch (action.type) {
    case fromActions.PROVINCES_STORE_ADD:
      return Object.assign({}, state, {
        provinces: action.payload
      });
    default:
      return state;
  }
}

// slices of state
export const getProvinces = (state: State) => state.provinces;
