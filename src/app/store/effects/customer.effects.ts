import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { catchError, map, mergeMap } from 'rxjs/operators';

import * as customerActions from '../../store/actions/customer.actions';
import * as notificationActions from '../../store/actions/notification.actions';
import { Customer } from '../../shared/models/customer.model';
import { Error } from '../../shared/models/error.model';
import * as ErrorCodes from '../../core/utils/error/error.codes';
import { CustomerService } from '../../core/services/customer.service';

@Injectable()
export class CustomerEffects {
  constructor(
    private actions$: Actions,
    private customerService: CustomerService
  ) {}

  @Effect()
  fetchAllCustomers$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.CustomerFetchAll>(
      customerActions.CUSTOMER_FETCH_ALL
    ),
    mergeMap(() =>
      this.customerService.fetchAllCustomers().pipe(
        map((data: any) => {
          return new customerActions.CustomerFetchAllSuccess(data.data);
        }),
        catchError((err, caught) => {
          return Observable.of(
            new notificationActions.ErrorThrow({
              type: ErrorCodes.CUSTOMER_FECTH_ALL_ERROR,
              description: err
            })
          );
        })
      )
    )
  );

  @Effect()
  fetchAllCustomersSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.CustomerFetchAllSuccess>(
      customerActions.CUSTOMER_FETCH_ALL_SUCCESS
    ),
    map(action => {
      return new customerActions.CustomersStoreAdd(action.payload);
    })
  );

  @Effect()
  fetchCustomer$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.CustomerFetch>(customerActions.CUSTOMER_FETCH),
    map(action => action.payload),
    mergeMap(id =>
      this.customerService.fetchCustomer(id).pipe(
        map((data: any) => {
          return new customerActions.CustomerFetchSuccess(data);
        }),
        catchError((err, caught) => {
          return Observable.of(
            new notificationActions.ErrorThrow({
              type: ErrorCodes.CUSTOMER_FECTH_ERROR,
              description: err
            })
          );
        })
      )
    )
  );

  @Effect()
  fetchCustomerSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.CustomerFetchSuccess>(
      customerActions.CUSTOMER_FETCH_SUCCESS
    ),
    map(action => {
      return new customerActions.CustomerStoreAdd(action.payload);
    })
  );

  @Effect()
  updateCustomer$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.CustomerUpdate>(customerActions.CUSTOMER_UPDATE),
    map(action => action.payload),
    mergeMap(customer =>
      this.customerService.updateCustomer(customer).pipe(
        map((data: any) => {
          return new customerActions.CustomerUpdateSuccess(data.data);
        }),
        catchError((err, caught) => {
          return Observable.of(
            new notificationActions.ErrorThrow({
              type: ErrorCodes.CUSTOMER_UPDATE_ERROR,
              description: err
            })
          );
        })
      )
    )
  );

  @Effect()
  updateCustomerSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.CustomerUpdateSuccess>(
      customerActions.CUSTOMER_UPDATE_SUCCESS
    ),
    map(action => {
      return new customerActions.CustomerStoreUpdate(action.payload);
    })
  );

  @Effect()
  addCustomer$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.CustomerAdd>(customerActions.CUSTOMER_ADD),
    map(action => action.payload),
    mergeMap(customer =>
      this.customerService.addCustomer(customer).pipe(
        map((data: any) => {
          return new customerActions.CustomerAddSuccess(customer);
        }),
        catchError((err, caught) => {
          return Observable.of(
            new notificationActions.ErrorThrow({
              type: ErrorCodes.CUSTOMER_ADD_ERROR,
              description: err
            })
          );
        })
      )
    )
  );

  @Effect()
  addCustomerSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.CustomerAddSuccess>(
      customerActions.CUSTOMER_ADD_SUCCESS
    ),
    map(action => {
      return new customerActions.CustomerStoreAdd(action.payload);
    })
  );

  @Effect()
  deleteCustomer$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.CustomerDelete>(customerActions.CUSTOMER_DELETE),
    map(action => action.payload),
    mergeMap(customerId =>
      this.customerService.deleteCustomer(customerId).pipe(
        map((data: any) => {
          return new customerActions.CustomerDeleteSuccess(customerId);
        }),
        catchError((err, caught) => {
          return Observable.of(
            new notificationActions.ErrorThrow({
              type: ErrorCodes.CUSTOMER_DELETE_ERROR,
              description: err
            })
          );
        })
      )
    )
  );

  @Effect()
  deleteCustomerSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.CustomerDeleteSuccess>(
      customerActions.CUSTOMER_DELETE_SUCCESS
    ),
    map(action => {
      return new customerActions.CustomerStoreRemove(action.payload);
    })
  );
}
