import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(password: string , repassword: string) {
    return (control: AbstractControl): ValidationErrors | null => {
        const pass = control.get(password);
        const repass = control.get(repassword);
        if (pass && repass && pass.value !== repass.value) {
            return { passwordMismatch: true };
        }
        return null;
    };
};