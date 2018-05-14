import { ActionReducerMap, ActionReducer, createSelector, combineReducers, createFeatureSelector, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../../environments/environment';
import { RouterStateUrl } from '../router.serializer';

import * as fromUser from './user.reducer';
import * as fromCustomer from './customer.reducer';
import * as fromData from './data.reducer';
import * as fromNotification from './notification.reducer';
import * as fromRouter from '@ngrx/router-store';

export interface State {
  data: fromData.State;
  user: fromUser.State;
  customers: fromCustomer.State;
  notifications: fromNotification.State;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}


export const rootReducers: ActionReducerMap<State> = {
  data: fromData.dataReducer,
  user: fromUser.userReducer,
  customers: fromCustomer.customerReducer,
  notifications: fromNotification.notificationReducer,
  router: fromRouter.routerReducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.groupCollapsed('%cstate change', 'color: green');
    console.log(state);
    console.groupEnd();
    console.groupCollapsed('%caction dispatched', 'color: green');
    console.log(action);
    console.groupEnd();

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, storeFreeze]
  : [];

// extract state slices
export const getDataState = (state: State) => state.data;
export const getUserState = (state: State) => state.user;
export const getCustomerState = (state: State) => state.customers;
export const getErrorState = (state: State) => state.notifications;

// router selector
export const getRouter = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('router');

// data selectors
export const getProvinces = createSelector(getDataState, fromData.getProvinces);

// user selectors
export const getUser = createSelector(getUserState, fromUser.getUser);
export const getUserAuth = createSelector(getUserState, fromUser.getUserAuth);

// customer selectors
export const getCustomers = createSelector(getCustomerState, fromCustomer.getCustomers);
export const getCustomer = createSelector(getCustomerState, fromCustomer.getCustomer);
export const getACtiveCustomer = createSelector(getCustomerState, fromCustomer.getSelectedCustomer);

// notifications selectors
export const getErrors = createSelector(getErrorState, fromNotification.getErrors);
export const getAlert = createSelector(getErrorState, fromNotification.getAlert);
