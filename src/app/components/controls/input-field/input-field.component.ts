import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { ValidationMsgs } from 'src/app/models/ValidationMsgs';
import { ValidationMessages } from 'src/app/utils/Validations';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputFieldComponent implements OnInit {
  // @Input() bindModelData: any;
  @Input() formGroup: FormGroup;
  @Input() label: string;
  @Input() name: string;
  @Input() type: string = 'text';
  @Input() errors: ValidationErrors | null | undefined;
  icon: string;
  fieldType: string;
  errorMsg: string;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.type) {
      this.fieldType = changes.type.currentValue;

      if (changes.type.currentValue === 'password') {
        this.icon = 'visibility_off';
      } else {
        this.icon = '';
      }
    }

    if (changes.errors?.currentValue) {
      const firstError: keyof ValidationMsgs = Object.keys(
        changes.errors.currentValue
      )[0] as keyof ValidationMsgs;

      if (firstError) {
        this.errorMsg = ValidationMessages[firstError];
      }
    } else {
      this.errorMsg = '';
    }
  }

  toggleVisibility() {
    this.fieldType = this.fieldType === 'text' ? 'password' : 'text';
    this.icon =
      this.icon === 'visibility_off' ? 'visibility' : 'visibility_off';
  }
}
