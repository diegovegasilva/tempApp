export interface FormGeneratorData {
    fields: FormGeneratorField[];
}
export interface FormGeneratorField {
    key: string;
    type?: FieldType;
    placeholder?: string;
    value: string;
    attributes?: FormGeneratorAttributes[];
    validations?: FormGeneratorValidation[];
    disabled?: boolean;
    readonly?: boolean;
    multiple?: boolean;
}

export interface FormGeneratorValidation {
    type: FieldValidation;
    value?: any;
}

export interface FormGeneratorAttributes {
    type: FieldAttribute;
    value?: any;
}


export type FieldType = 'text' | 'password' | 'tel' | 'email' | 'textarea'
    | 'radio' | 'checkbox' | 'select' | 'hidden' | 'range' | 'date' | 'number' | 'file';
export type FieldValidation = 'required' | 'email' | 'pattern' | 'minLength' | 'maxLength';
export type FieldAttribute = 'readonly' | 'disabled' | 'multiple';
