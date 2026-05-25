import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-rooms',
  imports: [],
  templateUrl: './dialog-rooms.html',
  styleUrl: './dialog-rooms.scss',
})
export class DialogRooms {
  readonly data = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<DialogRooms>);

  constructor(){
    console.log(this.data)
  }
}
