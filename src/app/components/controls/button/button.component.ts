import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() type: string = 'button';
  @Input() color: string = 'primary';
  @Input() disabled: boolean = false;

  @Output() buttonClicked = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClickHandler(event: Event) {
    this.buttonClicked.emit(event);
  }
}
