import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { catchError, map, mergeMap, switchMap, delay } from 'rxjs/operators';

import * as notificationActions from '../../store/actions/notification.actions';
import { Error } from '../../shared/models/error.model';
import * as ErrorCodes from '../../core/utils/error/error.codes';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class NotificationEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  throwError$: Observable<Action> = this.actions$.pipe(
    ofType<notificationActions.ErrorThrow>(notificationActions.THROW_ERROR),
    map(action => action.payload),
    mergeMap(error => {
      return Observable.of(
        new notificationActions.ErrorAdd({
          type: error.type,
          description: error.description
        })
      );
    })
  );

  @Effect()
  showAlert$: Observable<Action> = this.actions$.pipe(
    ofType<notificationActions.AlertShow>(notificationActions.SHOW_ALERT),
    map(action => action.payload),
    mergeMap(alert => {
      return Observable.of(
        new notificationActions.AlertAdd({
          type: alert.type,
          message: alert.message,
          duration: alert.duration,
          autoHide: alert.autoHide
        })
      );
    })
  );

  @Effect()
  hideAlert$: Observable<Action> = this.actions$.pipe(
    ofType<notificationActions.AlertAdd>(notificationActions.ADD_ALERT),
    map(action => action.payload),
    mergeMap(alert => {
      if (alert.autoHide === false) {
        return Observable.of();
      } else {
        return Observable.of(alert).pipe(
          delay(alert.duration || 4000),
          mergeMap(() => {
            return Observable.of(new notificationActions.AlertRemove());
          })
        );
      }
    })
  );
}
