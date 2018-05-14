import { Action } from '@ngrx/store';
import { Customer } from '../../shared/models/customer.model';

export const CUSTOMER_FETCH = '[CUSTOMER] FETCH';
export const CUSTOMER_FETCH_SUCCESS = '[CUSTOMER] FETCH SUCCESS';
export const CUSTOMER_FETCH_ALL = '[CUSTOMER] FETCH ALL';
export const CUSTOMER_FETCH_ALL_SUCCESS = '[CUSTOMER] FETCH ALL SUCCESS';
export const CUSTOMER_ADD = '[CUSTOMER] ADD';
export const CUSTOMER_ADD_SUCCESS = '[CUSTOMER] ADD SUCCESS';
export const CUSTOMER_UPDATE = '[CUSTOMER] UPDATE';
export const CUSTOMER_UPDATE_SUCCESS = '[CUSTOMER] UPDATE SUCCESS';
export const CUSTOMER_DELETE = '[CUSTOMER] DELETE';
export const CUSTOMER_DELETE_SUCCESS = '[CUSTOMER] DELETE SUCCESS';
export const CUSTOMER_STORE_ADD = '[CUSTOMER] STORE ADD';
export const CUSTOMERS_STORE_ADD = '[CUSTOMER] STORE ALL ADD';
export const CUSTOMER_STORE_SELECT = '[CUSTOMER] STORE SELECT';
export const CUSTOMER_STORE_UPDATE = '[CUSTOMER] STORE UPDATE';
export const CUSTOMER_STORE_REMOVE = '[CUSTOMER] STORE REMOVE';

export class CustomerFetch implements Action {
  readonly type = CUSTOMER_FETCH;
  constructor(public payload: number) {}
}

export class CustomerFetchSuccess implements Action {
  readonly type = CUSTOMER_FETCH_SUCCESS;
  constructor(public payload: Customer) {}
}

export class CustomerFetchAll implements Action {
  readonly type = CUSTOMER_FETCH_ALL;
  constructor() {}
}

export class CustomerFetchAllSuccess implements Action {
  readonly type = CUSTOMER_FETCH_ALL_SUCCESS;
  constructor(public payload: Customer[]) {}
}

export class CustomerAdd implements Action {
  readonly type = CUSTOMER_ADD;
  constructor(public payload: Customer) {}
}

export class CustomerAddSuccess implements Action {
  readonly type = CUSTOMER_ADD_SUCCESS;
  constructor(public payload: Customer) {}
}

export class CustomerUpdate implements Action {
  readonly type = CUSTOMER_UPDATE;
  constructor(public payload: Customer) {}
}

export class CustomerUpdateSuccess implements Action {
  readonly type = CUSTOMER_UPDATE_SUCCESS;
  constructor(public payload: Customer) {}
}

export class CustomerDelete implements Action {
  readonly type = CUSTOMER_DELETE;
  constructor(public payload: number) {}
}

export class CustomerDeleteSuccess implements Action {
  readonly type = CUSTOMER_DELETE_SUCCESS;
  constructor(public payload: number) {}
}

export class CustomersStoreAdd implements Action {
  readonly type = CUSTOMERS_STORE_ADD;
  constructor(public payload: Customer[]) {}
}
export class CustomerStoreAdd implements Action {
  readonly type = CUSTOMER_STORE_ADD;
  constructor(public payload: Customer) {}
}

export class CustomerStoreSelect implements Action {
  readonly type = CUSTOMER_STORE_ADD;
  constructor(public payload: Customer) {}
}

export class CustomerStoreUpdate implements Action {
  readonly type = CUSTOMER_STORE_UPDATE;
  constructor(public payload: Customer) {}
}

export class CustomerStoreRemove implements Action {
  readonly type = CUSTOMER_STORE_REMOVE;
  constructor(public payload: number) {}
}

export type Actions =
  | CustomerFetch
  | CustomerFetchSuccess
  | CustomerFetchAll
  | CustomerFetchAllSuccess
  | CustomerAdd
  | CustomerAddSuccess
  | CustomerUpdate
  | CustomerUpdateSuccess
  | CustomerDelete
  | CustomerDeleteSuccess
  | CustomerStoreAdd
  | CustomersStoreAdd
  | CustomerStoreSelect
  | CustomerStoreUpdate
  | CustomerStoreRemove;
