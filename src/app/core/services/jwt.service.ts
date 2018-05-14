import { Injectable } from '@angular/core';
import * as decode from 'jwt-decode';
import * as moment from 'moment';

@Injectable()
export class JwtService {
  private tokenKey = 'token';
  private token = localStorage.getItem(this.tokenKey);

  constructor() {}

  getToken() {
    return this.token;
  }

  saveToken(token: string): void {
    this.token = token;
    localStorage.setItem(this.tokenKey, token);
  }

  deleteToken(): void {
    this.token = undefined;
    localStorage.removeItem(this.tokenKey);
  }

  tokenValid() {
    return moment().unix() < this.decodeToken().exp;
  }

  getUserId() {
    return this.decodeToken().uid;
  }

  private decodeToken(): any {
    return decode(this.token);
  }
}
