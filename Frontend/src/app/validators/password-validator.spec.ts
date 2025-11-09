import { FormGroup, FormControl } from '@angular/forms';
import { passwordValidator } from './password-validator';

describe('passwordValidator', () => {
  it('should return null when passwords match', () => {
    const formGroup = new FormGroup({
      password: new FormControl('password123'),
      repassword: new FormControl('password123'),
    });
    const validator = passwordValidator('password', 'repassword');
    const result = validator(formGroup);
    expect(result).toBeNull();
  });

  it('should return error when passwords do not match', () => {
    const formGroup = new FormGroup({
      password: new FormControl('password123'),
      repassword: new FormControl('different123'),
    });
    const validator = passwordValidator('password', 'repassword');
    const result = validator(formGroup);
    expect(result).toEqual({ passwordMismatch: true });
  });

  it('should return null when both passwords are empty', () => {
    const formGroup = new FormGroup({
      password: new FormControl(''),
      repassword: new FormControl(''),
    });
    const validator = passwordValidator('password', 'repassword');
    const result = validator(formGroup);
    expect(result).toBeNull();
  });
});
