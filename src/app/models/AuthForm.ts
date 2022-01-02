import { ValidationErrors } from '@angular/forms';

export interface AuthForm {
  email: string;
  password: string;
  confirmPassword?: string;
  username?: string;
}

export interface AuthFormCustomErrors {
  email?: ValidationErrors;
  password?: ValidationErrors;
  username?: ValidationErrors;
}
