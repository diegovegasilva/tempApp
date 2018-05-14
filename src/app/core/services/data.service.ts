import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Province } from '../../shared/models/province.model';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  fetchProvinces(): Observable<Province[]> {
    return this.http.get<Province[]>(`${environment.API}getProvinces`);
  }
}
