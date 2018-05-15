import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as errorMsg from '../../../core/utils/error/error.codes';
import * as _ from 'lodash';
import {
  distinctUntilChanged,
  debounceTime
} from 'rxjs/operators';

import { FormGeneratorData, FormGeneratorField } from '../../models/formGenerator.model';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.scss']
})
export class FormGeneratorComponent implements OnInit, OnDestroy {
  @Input() settings: FormGeneratorData;
  @Output() formChanges = new EventEmitter<any>();
  @Output() saveForm = new EventEmitter<any>();
  form: FormGroup;
  formSub: Subscription;
  formModified = false;
  fields: FormGeneratorField<any>[];
  errorMsg;
  originalValues = {};

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.fields = this.settings.fields;
    this.errorMsg = errorMsg;
    this.createForm();
    this.getOriginalValues();


    this.formSub = this.form.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(value => {
        this.formChanges.emit(value);
        this.formModified = !_.isEqual(value, this.originalValues);
      });

  }

  getOriginalValues() {
    _.each(this.fields, field => {
      this.originalValues[field.key] = field.value;
    });
    console.log(this.originalValues);
  }

  createForm() {
    this.form = this.fb.group(this.createFormObject());
  }

  createFormObject() {
    const formObject = {};
    _.each(this.fields, field => {
      formObject[field.key] = new FormControl(
        { value: field.value || '', disabled: field.disabled }, this.addValidators(field.validators));
    });

    return formObject;
  }

  addValidators(validationData: any[]): any[] {
    const validatiors = [];
    _.each(validationData, val => {
      validatiors.push(Validators[val.type]);
    });
    return validatiors;
  }

  save() {
    this.saveForm.emit(this.form.value);
  }

  reset() {
    this.form.reset();
    this.form.patchValue(this.originalValues);
  }

  ngOnDestroy() {
    this.formSub.unsubscribe();
  }
}
