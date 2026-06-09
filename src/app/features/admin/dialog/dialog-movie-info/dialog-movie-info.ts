import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-movie-info',
  imports: [DatePipe],
  templateUrl: './dialog-movie-info.html',
  styleUrl: './dialog-movie-info.scss',
})
export class DialogMovieInfo {
  readonly data = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<DialogMovieInfo>);

  constructor(){
    console.log(this.data)
  }
  checkMovieStatus(status: string): string{
    if(status === 'showing'){
      return 'Em cartaz'
    }
    else if(status === 'coming_soon'){
      return 'Em breve'
    }
    else if(status === 'off_screen'){
      return 'Fora de cartaz'
    } 
    else {
      return 'Erro'
    }
  }
  minsToHours(mins: number){
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours}h${minutes}min`;
  }
}
