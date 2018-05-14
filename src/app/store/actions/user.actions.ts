import { Action } from '@ngrx/store';
import { User } from '../../shared/models/user.model';

export const USER_LOGIN = '[USER] LOGIN';
export const USER_LOGIN_SUCCESS = '[USER] LOGIN SUCCESS';
export const USER_LOGOUT = '[USER] LOGOUT';
export const USER_LOGOUT_SUCCESS = '[USER] LOGOUT SUCCESS';
export const USER_VALIDATE = '[USER] VALIDATE';
export const USER_STORE_ADD = '[USER] STORE ADD';
export const USER_STORE_REMOVE = '[USER] STORE REMOVE';

export class UserLogin implements Action {
  readonly type = USER_LOGIN;
  constructor(public payload: any) {}
}

export class UserLoginSuccess implements Action {
  readonly type = USER_LOGIN_SUCCESS;
  constructor(public payload: User) {}
}

export class UserLogout implements Action {
  readonly type = USER_LOGOUT;
  constructor() {}
}

export class UserLogoutSuccess implements Action {
  readonly type = USER_LOGOUT_SUCCESS;
  constructor() {}
}

export class UserValidate implements Action {
  readonly type = USER_VALIDATE;
  constructor() {}
}

export class UserStoreAdd implements Action {
  readonly type = USER_STORE_ADD;
  constructor(public payload: any) {}
}

export class UserStoreRemove implements Action {
  readonly type = USER_STORE_REMOVE;
  constructor() {}
}

export type Actions =
  | UserLogin
  | UserLoginSuccess
  | UserLogout
  | UserLogoutSuccess
  | UserValidate
  | UserStoreAdd
  | UserStoreRemove;
