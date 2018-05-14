import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { catchError, map, mergeMap } from 'rxjs/operators';

import * as dataActions from '../../store/actions/data.actions';
import * as notificationActions from '../../store/actions/notification.actions';
import { Province } from '../../shared/models/province.model';
import { Error } from '../../shared/models/error.model';
import * as ErrorCodes from '../../core/utils/error/error.codes';
import { DataService } from '../../core/services/data.service';

@Injectable()
export class DataEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}

  @Effect()
  fetchProvinces$: Observable<Action> = this.actions$.pipe(
    ofType<dataActions.ProvincesFetch>(dataActions.PROVINCES_FETCH),
    mergeMap(() =>
      this.dataService.fetchProvinces().pipe(
        map((data: any) => {
          return new dataActions.ProvincesFetchSuccess(data);
        }),
        catchError((err, caught) => {
          return Observable.of(
            new notificationActions.ErrorThrow({
              type: ErrorCodes.PROVINCES_FECTH_ERROR,
              description: err
            })
          );
        })
      )
    )
  );

  @Effect()
  fetchProvincesSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<dataActions.ProvincesFetchSuccess>(
      dataActions.PROVINCES_FETCH_SUCCESS
    ),
    map(action => {
      return new dataActions.ProvincesStoreAdd(action.payload);
    })
  );
}
