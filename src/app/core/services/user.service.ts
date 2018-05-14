import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { User } from '../../shared/models/user.model';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id: Number): Observable<any> {
    return this.http
      .get(`${environment.API}getUser?id=${id}`);
  }
}
