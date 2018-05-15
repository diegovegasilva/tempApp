import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { getRouter, getCustomer, getProvinces } from '../../../store/reducers';

import * as customerActions from '../../../store/actions/customer.actions';

import { Observable } from 'rxjs/Observable';
import {
  map,
  filter,
  first,
  distinctUntilChanged,
  debounceTime
} from 'rxjs/operators';
import * as _ from 'lodash';
import * as errorMsg from '../../../core/utils/error/error.codes';

import { Customer } from '../../../shared/models/customer.model';
import { Province } from '../../../shared/models/province.model';



import { FormGeneratorData, FormGeneratorInput, FormGeneratorSelect } from '../../../shared/models/formGenerator.model';

@Component({
  selector: 'app-customers-detail',
  templateUrl: './customers-detail.component.html',
  styleUrls: ['./customers-detail.component.scss']
})
export class CustomersDetailComponent implements OnInit, OnDestroy {
  customer: Customer;
  customerSub: Subscription;
  sub: Subscription;
  provinces$: Observable<Province[]>;
  customerId: number;
  isUpdatePage: boolean;
  formSettings: FormGeneratorData;

  constructor(private store: Store<any>, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.provinces$ = this.store.select(getProvinces);
    this.sub = this.store
      .select(getRouter)
      .pipe(map(route => route.state), first())
      .subscribe(route => {
        if (route.params.id) {
          this.isUpdatePage = true;
          this.getCustomerDetail(route.params.id);
        } else {
          this.isUpdatePage = false;
          this.setupForm();
        }
      });
  }

  getCustomerDetail(customerId) {
    this.customerId = +customerId;
    this.store.dispatch(new customerActions.CustomerFetch(this.customerId));
    this.customerSub = this.store
      .select(getCustomer)
      .pipe(filter((customer: any) => customer))
      .subscribe(customer => {
        this.customer = customer;
        this.setupForm(this.customer);
      });
  }

  saveForm(values) {
    if (this.isUpdatePage) {
      this.updateCustomer(values);
    } else {
      this.saveCustomer(values);
    }
  }

  updateCustomer(values) {
    this.store.dispatch(
      new customerActions.CustomerUpdate(values)
    );
  }

  saveCustomer(values) {
    this.store.dispatch(
      new customerActions.CustomerAdd(values)
    );
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
    if (this.isUpdatePage) {
      this.customerSub.unsubscribe();
    }
  }

  setupForm(values?: Customer) {
    this.formSettings = {
      fields: [
        new FormGeneratorInput(
          {
            key: 'name',
            type: 'text',
            placeholder: 'Nombre',
            value: values ? values.name : '',
            validators: [
              { type: 'required' },
            ]
          }
        ),
        new FormGeneratorInput(
          {
            key: 'email',
            type: 'email',
            placeholder: 'Email',
            value: values ? values.email : '',
            validators: [
              { type: 'required' },
              { type: 'email' }
            ]
          }
        ),
        new FormGeneratorInput(
          {
            key: 'phone',
            type: 'tel',
            placeholder: 'Teléfono',
            value: values ? values.phone : '',
            validators: [
              { type: 'required' }
            ]
          }
        ),
        new FormGeneratorInput(
          {
            key: 'contact',
            type: 'text',
            placeholder: 'Persona de contacto',
            value: values ? values.contact : '',
            validators: [
              { type: 'required' }
            ]
          }
        ),
        new FormGeneratorInput(
          {
            key: 'address',
            type: 'text',
            placeholder: 'Dirección',
            value: values ? values.address : '',
            validators: [
              { type: 'required' }
            ]
          }
        ),
        new FormGeneratorInput(
          {
            key: 'city',
            type: 'text',
            placeholder: 'Ciudad',
            value: values ? values.city : '',
            validators: [
              { type: 'required' }
            ]
          }
        ),
        new FormGeneratorSelect(
          {
            key: 'province',
            placeholder: 'Provincia',
            value: values ? values.province : '',
            options: this.provinces$,
            optionKeys: { key: 'id', value: 'province' },
            validators: [
              { type: 'required' }
            ]
          }
        ),
        new FormGeneratorInput(
          {
            key: 'cif',
            type: 'text',
            placeholder: 'CIF',
            value: values ? values.cif : '',
            validators: [
              { type: 'required' }
            ]
          }
        ),
        new FormGeneratorInput(
          {
            key: 'zip',
            type: 'text',
            placeholder: 'Código Postal',
            value: values ? values.zip : '',
            validators: [
              { type: 'required' }
            ]
          }
        )
      ]
    };
  }
}
