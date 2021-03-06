import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Form, Field } from '../model';

@Component({
    //moduleId: module.id,
    selector: 'nerv-input-field',
    templateUrl: 'app/lib/form/fields/input.field.html',
})
export class InputField implements OnInit {
    @Input('readonly') enableReadonly: boolean = false;
    @Input() formGroup: FormGroup;
    @Input() field: Field;
    @Input() data: {};
    error: string = '';

    get value(): any {
        return this.data[this.field.name];
    }

    get required(): boolean {
        return this.field.validators ? this.field.validators['required'] : false;
    }

    ngOnInit(): void {
        const control = this.formGroup.get(this.field.name);

        control.valueChanges.subscribe(value => this.onValueChanges(value));
    }

    private onValueChanges(value?: any) {
        if (value) {
            this.data[this.field.name] = this.parse(value);
        } else {
            this.data[this.field.name] = null;
        }

        this.error = '';
        const formGroup = this.formGroup;
        const field = this.field;
        const control = formGroup.get(field.name);
        if (control && control.dirty && !control.valid) {
            for (const key in control.errors) {
                this.error += field.validators[key].message + ' ';
            }
        }
    }

    private parse(value: any): any {
        switch (this.field.type) {
            case 'long':
                return parseInt(value);
            default:
                return value;
        }
    }
}