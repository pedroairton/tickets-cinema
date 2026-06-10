import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from '../../../core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Screening } from '../../../core/models/movie.model';
import { DialogScreening } from '../dialog/dialog-screening/dialog-screening';
import { LoadingComponent } from "../../../shared/loading/loading.component";

@Component({
  selector: 'app-screenings',
  imports: [MatIconModule, LoadingComponent],
  templateUrl: './screenings.html',
  styleUrl: './screenings.scss',
})
export class Screenings {
  screenings = signal<any>(null)
  isLoading = signal(false)
  private adminService = inject(AdminService)
  private toastr = inject(ToastrService)

  constructor(private dialog: MatDialog) {}

  loadScreenings(){
    this.isLoading.set(true)
    this.adminService.getScreenings().subscribe({
      next: (res) => {
        this.screenings.set(res)
        console.log(this.screenings())
        this.isLoading.set(false)

      },
      error: (err) => {
        this.toastr.error(err.error.message)
        this.isLoading.set(false)
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
