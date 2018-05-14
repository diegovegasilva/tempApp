import { Observable } from 'rxjs/Observable';

export interface FormGeneratorData {
    fields: FormGeneratorField<any>[];
}
export interface FormGeneratorOptions<T> {
    value?: T;
    key?: string;
    inputType?: InputType;
    type?: FieldType;
    placeholder?: string;
    validators?: FormGeneratorValidation[];
    attributes?: FormGeneratorAttributes[];
    disabled?: boolean;
    readonly?: boolean;
    multiple?: boolean;
    options?: FormGeneratorSelectOptions;
}

export interface FormGeneratorAttributes {
    type: string;
    value?: any;
}

export interface FormGeneratorValidation {
    type: FieldValidation;
    value?: any;
}

export interface FormGeneratorSelectOptions {
    value: any;
    label: any;
}

export type InputType = 'text'| 'select' | 'radio' | 'checkbox' | 'textarea';
export type FieldType = 'text' | 'password' | 'tel' | 'email' | 'textarea'
    | 'radio' | 'checkbox' | 'select' | 'hidden' | 'range' | 'date' | 'number' | 'file' | 'color' | 'time';
export type FieldValidation = 'required' | 'email' | 'pattern' | 'minLength' | 'maxLength';


export class FormGeneratorField<T> {
    value: T;
    key: string;
    placeholder: string;
    readonly: boolean;
    disabled: boolean;
    inputType: string;
    validators: any[];
    type: FieldType;

    constructor(options: FormGeneratorOptions<T> = {}) {
        this.value = options.value;
        this.key = options.key;
        this.inputType = options.inputType;
        this.placeholder = options.placeholder || '';
        this.readonly = !!options.readonly;
        this.disabled = !!options.disabled;
        this.validators = options.validators || undefined;

    }
}

export class FormGeneratorInput extends FormGeneratorField<string> {
    inputType = 'text';
    type: FieldType;

    constructor(options: FormGeneratorOptions<string> = {}) {
        super(options);
        this.type = options['type'] || 'text';
    }

}

