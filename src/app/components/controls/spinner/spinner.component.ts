import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpinnerComponent implements OnInit {
  @Input() diameter: number = 30;
  @Input() color: string = 'white';

  constructor() {}

  ngOnInit(): void {}
}
