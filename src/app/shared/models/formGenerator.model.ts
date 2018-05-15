import { Observable } from 'rxjs/Observable';


export type InputType = 'text' | 'select' | 'radio' | 'checkbox' | 'textarea' | 'slideToggle';
export type FieldType = 'text' | 'password' | 'tel' | 'email' | 'textarea'
    | 'radio' | 'checkbox' | 'select' | 'hidden' | 'range' | 'date' | 'number' | 'file' | 'color' | 'time';
export type FieldValidation = 'required' | 'email' | 'pattern' | 'minLength' | 'maxLength';

export interface FormGeneratorAttributes {
    type: string;
    value?: any;
}

export interface FormGeneratorValidation {
    type: FieldValidation;
    value?: any;
}

export interface FormGeneratorSelectOptions {
    key: any;
    value: any;
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
    options?: Observable<any>;
    optionKeys?: FormGeneratorSelectOptions;
}






export interface FormGeneratorData {
    fields: FormGeneratorField<any>[];
}

// Main formControl type class
export class FormGeneratorField<T> {
    value: T;
    key: string;
    inputType: string;
    type: FieldType;
    placeholder: string;
    validators: any[];
    attributes: FormGeneratorAttributes[];
    disabled: boolean;
    readonly: boolean;
    multiple: boolean;
    options: Observable<any>;
    optionKeys: FormGeneratorSelectOptions;

    constructor(options: FormGeneratorOptions<T> = {}) {
        this.value = options.value;
        this.key = options.key;
        this.inputType = options.inputType;
        this.type = options.type;
        this.placeholder = options.placeholder || '';
        this.validators = options.validators || undefined;
        this.attributes = options.attributes || undefined;
        this.disabled = !!options.disabled;
        this.readonly = !!options.readonly;
        this.multiple = !!options.multiple;
        this.options = options.options;
        this.optionKeys = options.optionKeys;
    }
}

// Input type text
export class FormGeneratorInput extends FormGeneratorField<string> {
    inputType = 'text';
    type: FieldType;

    constructor(options: FormGeneratorOptions<string> = {}) {
        super(options);
        this.type = options['type'] || 'text';
    }
}

export class FormGeneratorSelect extends FormGeneratorField<string> {
    inputType = 'select';
    options: Observable<any>;
    optionKeys: FormGeneratorSelectOptions;

    constructor(options: FormGeneratorOptions<string>) {
        super(options);
        this.options = options['options'] || undefined;
        this.optionKeys = options['optionKeys'] || undefined;
    }
}

export class FormGeneratorCheckbox extends FormGeneratorField<boolean> {
    inputType = 'checkbox';

    constructor(options: FormGeneratorOptions<boolean> = {}) {
        super(options);
    }
}

export class FormGeneratorSlideToggle extends FormGeneratorField<boolean> {
    inputType = 'slideToggle';

    constructor(options: FormGeneratorOptions<boolean> = {}) {
        super(options);
    }
}

