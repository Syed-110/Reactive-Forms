import { AbstractControl } from '@angular/forms';

export function passwordValidator(control : AbstractControl) {
    const password = control.get('password');
    const cnfPassword = control.get('cnfPassword');
    if(password?.pristine || cnfPassword?.pristine) {
        return null;
    }
    return password && cnfPassword && password?.value === cnfPassword?.value ? null : {'misMatch' : true}
}