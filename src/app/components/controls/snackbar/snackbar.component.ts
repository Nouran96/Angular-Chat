import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Snackbar } from 'src/app/models/Shared';
import { selectSnackbar } from 'src/app/store/selectors/shared.selector';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SnackbarComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar, private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectSnackbar).subscribe((res) => {
      if (res.openSnackbar) {
        this.openSnackBar(res);
      }
    });
  }

  openSnackBar(snackbar: Snackbar) {
    this._snackBar.open(snackbar.message, 'Close', {
      duration: 4000,
      panelClass: [
        'snackbar-container',
        ...(snackbar.className ? [snackbar.className] : []),
      ],
    });
  }
}
