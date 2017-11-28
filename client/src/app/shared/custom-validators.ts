import { FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export class CustomValidators {


    static testFio(c: FormControl): ValidationErrors {
        const isValid = /[a-zA-Z] /.test(c.value);
        const message = {
            'testFio': {
                'message': 'The fio is not right',
            }
        };

        return isValid ? null : message;
    }

}
