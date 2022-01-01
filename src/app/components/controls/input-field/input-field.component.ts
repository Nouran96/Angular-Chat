import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputFieldComponent implements OnInit {
  @Input() bindModelData: any;
  @Input() label: string;
  @Input() name: string;
  @Input() type: string = 'text';
  icon: string;
  fieldType: string;

  // note that this must be named as the input name + "Change"
  @Output() bindModelDataChange: any = new EventEmitter();

  updateData(event: Event) {
    this.bindModelData = event;
    this.bindModelDataChange.emit(event);
  }

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
  }

  toggleVisibility() {
    this.fieldType = this.fieldType === 'text' ? 'password' : 'text';
    this.icon =
      this.icon === 'visibility_off' ? 'visibility' : 'visibility_off';
  }
}
