import { AbstractControl, ValidatorFn } from '@angular/forms';

// export function userNameValidator(control : AbstractControl){
//     const forbidden = /admin/.test(control.value);
//     return forbidden ? {'userNameForbidden' : {value : control.value}} : null;
// }
export function userNameValidator(userNameForbidden : RegExp) : ValidatorFn {
    return (control : AbstractControl) => {
        const forbidden = userNameForbidden.test(control.value);
        return forbidden ? {'userNameForbidden' : {value : control.value}} : null;
    }
}