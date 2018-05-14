import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as errorMsg from '../../../core/utils/error/error.codes';
import * as _ from 'lodash';

import { FormGeneratorData, FormGeneratorField } from '../../models/formGenerator.model';
@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.scss']
})
export class FormGeneratorComponent implements OnInit {
  @Input() settings: FormGeneratorData;
  form: FormGroup;
  fields: FormGeneratorField<any>[];
  errorMsg;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    console.log(this.settings);
    this.fields = this.settings.fields;
    this.errorMsg = errorMsg;
    this.createForm();

  }

  createForm() {
    this.form = this.fb.group(this.createFormObject());
  }

  createFormObject() {
    const formObject = {};
    _.each(this.fields, field => {
      console.log('each', field);
      formObject[field.key] = new FormControl(field.value || '', this.addValidators(field.validators));
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

  test() {
    console.log(this.form);
  }
}
