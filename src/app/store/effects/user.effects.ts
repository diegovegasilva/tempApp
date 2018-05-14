import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { catchError, map, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';

import { AuthService } from '../../core/services/auth.service';
import { JwtService } from '../../core/services/jwt.service';
import { UserService } from '../../core/services/user.service';
import * as userActions from '../../store/actions/user.actions';
import * as notification from '../../store/actions/notification.actions';
import { User } from '../../shared/models/user.model';
import { Error } from '../../shared/models/error.model';
import * as ErrorCodes from '../../core/utils/error/error.codes';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private jwtService: JwtService,
    private userService: UserService,
    private router: Router
  ) {}

  @Effect()
  loginUser$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.UserLogin>(userActions.USER_LOGIN),
    map(action => action.payload),
    mergeMap(user =>
      this.authService.login(user.username, user.password).pipe(
        map((data: User) => {
          data.isAuth = true;
          return new userActions.UserLoginSuccess(data);
        }),
        catchError((err, caught) => {
          return from([
            new notification.ErrorThrow({
              type: ErrorCodes.LOGIN_ERROR,
              description: err
            }),
            new notification.AlertAdd({
              type: 'danger',
              message: err.message
            })
          ]);
        })
      )
    )
  );

  @Effect()
  logoutUser$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.UserLogout>(userActions.USER_LOGOUT),
    map(action => action),
    mergeMap(user => {
      return this.authService.logout().pipe(
        map(res => {
          this.router.navigateByUrl('/login');
          return new userActions.UserLogoutSuccess();
        })
      );
    })
  );

  @Effect()
  validateUser$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.UserValidate>(userActions.USER_VALIDATE),
    map(action => {
      return action;
    }),
    mergeMap(token => {
      if (this.jwtService.getToken()) {
        return this.userService.getUser(this.jwtService.getUserId()).pipe(
          map((data: User) => {
            data.isAuth = true;
            return new userActions.UserStoreAdd(data);
          }),
          catchError((err, caught) => {
            this.router.navigateByUrl('/login');
            return Observable.of(
              new notification.ErrorThrow({
                type: ErrorCodes.INVALID_TOKEN,
                description: err
              })
            );
          })
        );
      } else {
        this.router.navigateByUrl('/login');
        return Observable.of(
          new notification.ErrorThrow({
            type: ErrorCodes.INVALID_TOKEN,
            description: 'invalid token'
          })
        );
      }
    })
  );

  @Effect()
  loginUserSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.UserLoginSuccess>(userActions.USER_LOGIN_SUCCESS),
    map(action => {
      this.router.navigateByUrl('/home');
      return new userActions.UserStoreAdd(action.payload);
    })
  );
}
