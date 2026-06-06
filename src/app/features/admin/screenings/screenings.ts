import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from '../../../core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Screening } from '../../../core/models/movie.model';
import { DialogScreening } from '../dialog/dialog-screening/dialog-screening';

@Component({
  selector: 'app-screenings',
  imports: [MatIconModule],
  templateUrl: './screenings.html',
  styleUrl: './screenings.scss',
})
export class Screenings {
  screenings = signal<any>(null)
  private adminService = inject(AdminService)
  private toastr = inject(ToastrService)

  constructor(private dialog: MatDialog) {}

  loadScreenings(){
    this.adminService.getScreenings().subscribe({
      next: (res) => {
        this.screenings.set(res)
        console.log(this.screenings())

      },
      error: (err) => {
        this.toastr.error(err.error.message)
      }
    })
  }

  ngOnInit() {
    this.loadScreenings()
  }

  openDialog(screening?: Screening, room?: number): void {
      const dialogRef = this.dialog.open(DialogScreening, {
        width: '500px',
        data: {
          screening: screening,
          room: room
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadScreenings();
        }
      });
    }
}
