import { Action } from '@ngrx/store';
import { Province } from '../../shared/models/province.model';

export const PROVINCES_FETCH = '[DATA] PROVINCES FETCH';
export const PROVINCES_FETCH_SUCCESS = '[DATA] PROVINCES FETCH SUCCESS';
export const PROVINCES_STORE_ADD = '[DATA] PROVINCES STORE ADD';

export class ProvincesFetch implements Action {
  readonly type = PROVINCES_FETCH;
  constructor() {}
}

export class ProvincesFetchSuccess implements Action {
  readonly type = PROVINCES_FETCH_SUCCESS;
  constructor(public payload: Province[]) {}
}

export class ProvincesStoreAdd implements Action {
  readonly type = PROVINCES_STORE_ADD;
  constructor(public payload: Province[]) {}
}

export type Actions =
  | ProvincesFetch
  | ProvincesFetchSuccess
  | ProvincesStoreAdd;
