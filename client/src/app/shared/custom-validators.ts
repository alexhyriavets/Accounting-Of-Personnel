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

    // static testDate(c: FormControl): ValidationErrors {
    //     const isValid = /^\d\/+$/.test(c.value);
    //     const message = {
    //         'testDate': {
    //             'message': 'Input date in YYYY-MM-DD format',
    //         }
    //     };

    //     return isValid ? null : message;
    // }
}
