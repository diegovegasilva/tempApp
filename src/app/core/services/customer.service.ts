import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Customer } from '../../shared/models/customer.model';

@Injectable()
export class CustomerService {
  constructor(private http: HttpClient) {}

  fetchAllCustomers() {
    return this.http.get(`${environment.API}getClients`);
  }

  fetchCustomer(id) {
    return this.http.get(`${environment.API}getClient?id=${id}`);
  }

  updateCustomer(customer: Customer) {
    return this.http.put(
      `${environment.API}editClient?id=${customer.id}`,
      customer
    );
  }

  addCustomer(customer: Customer) {
    return this.http.post(`${environment.API}addClient`, customer);
  }

  deleteCustomer(customerId) {
    return this.http.delete(`${environment.API}deleteClient?id=${customerId}`);
  }
}
