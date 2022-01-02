import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ValidationMsgs } from '../models/ValidationMsgs';

export const ValidationMessages = {
  required: 'Field is required',
  invalidEmail: 'Invalid email address',
  passwordsMismatch: "Passwords don't match",
};

export const passwordsMismatch = (
  c: AbstractControl
): ValidationErrors | null => {
  if (
    c.get('confirmPassword') &&
    c.get('password')?.value !== c.get('confirmPassword')?.value
  ) {
    return { passwordsMismatch: true };
  }

  return null;
};

export const emailValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const isValid = emailRegex.test(control.value);
  return isValid ? null : { invalidEmail: true };
};

export const minLengthValidator = (length: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value?.length >= length
      ? null
      : { minlength: `Min length of ${length} characters` };
  };
};
