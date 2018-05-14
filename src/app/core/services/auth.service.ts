import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { User } from '../../shared/models/user.model';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private jwtService: JwtService) {}

  login(user: string, password: string): Observable<User> {
    return this.http
      .post<any>(`${environment.API}login`, {
        username: user,
        password: password
      })
      .pipe(
        map(data => {
          this.jwtService.saveToken(data.token);
          return data.data;
        })
      );
  }

  logout(): Observable<boolean> {
    this.jwtService.deleteToken();
    return Observable.of(true);
  }

  isAuth(): boolean {
    return this.jwtService.getToken() && this.jwtService.tokenValid();
  }
}
