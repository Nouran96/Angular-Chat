import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputFieldComponent implements OnInit {
  @Input() myId: string;
  @Input() bindModelData: any;
  @Input() label: string;
  @Input() name: string;
  @Input() type: string = 'text';

  // note that this must be named as the input name + "Change"
  @Output() bindModelDataChange: any = new EventEmitter();

  updateData(event: Event) {
    this.bindModelData = event;
    this.bindModelDataChange.emit(event);
  }

  constructor() {}

  ngOnInit(): void {}
}
