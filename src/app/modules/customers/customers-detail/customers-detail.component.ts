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
  formValues: Subscription;
  provinces$: Observable<Province[]>;
  customerForm: FormGroup;
  formModified = false;
  customerId: number;
  errorMsg;
  isUpdatePage: boolean;

  formSettings: FormGeneratorData;

  constructor(private store: Store<any>, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.sub = this.store
      .select(getRouter)
      .pipe(map(route => route.state), first())
      .subscribe(route => {
        if (route.params.id) {
          this.isUpdatePage = false;
          this.updateRouteConfig(route.params.id);
        } else {
          this.isUpdatePage = true;
        }
      });
    this.provinces$ = this.store.select(getProvinces);
    this.errorMsg = errorMsg;
    this.setupForm();
  }

  updateRouteConfig(customerId) {
    this.customerId = +customerId;
    this.store.dispatch(new customerActions.CustomerFetch(this.customerId));
    this.customerSub = this.store
      .select(getCustomer)
      .pipe(filter((customer: any) => customer))
      .subscribe(customer => {
        this.customer = customer;
        this.customerForm.patchValue(this.customer);
      });
    this.formValues = this.customerForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(value => {
        this.formModified = !_.isEqual(value, this.customer);
        console.log(this.customerForm);
      });
  }

  createForm() {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      contact: ['', Validators.required],
      address: [, Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      cif: ['', Validators.required],
      zip: ['', Validators.required],
      id: ''
    });
  }

  updateCustomer() {
    this.store.dispatch(
      new customerActions.CustomerUpdate(this.customerForm.value)
    );
  }

  saveCustomer() {
    this.store.dispatch(
      new customerActions.CustomerAdd(this.customerForm.value)
    );
  }

  resetForm() {
    this.customerForm.patchValue(this.customer);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    if (!this.isUpdatePage) {
      this.customerSub.unsubscribe();
      this.formValues.unsubscribe();
    }
  }

  setupForm() {
    this.formSettings = {
      fields: [
        new FormGeneratorInput(
          {
            key: 'name',
            type: 'text',
            placeholder: 'name',
            value: 'pepe2',
            validators: [
              { type: 'required' },
            ],

          },
        ),
        new FormGeneratorInput(
          {
            key: 'email',
            type: 'email',
            placeholder: 'email',
            value: 'pepe2@pepe.com',
            validators: [
              { type: 'required' },
              { type: 'email' }
            ],

          }
        ),
        new FormGeneratorSelect(
          {
            key: 'provinces',
            placeholder: 'provincias',
            options: this.provinces$,
            optionKeys: { key: 'id', value: 'province' },
            validators: [
              { type: 'required' },
            ],
          }
        )
      ]
    };
  }
}
