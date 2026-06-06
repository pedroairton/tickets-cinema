import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from '../../../core/services/admin.service';
import { ToastrService } from 'ngx-toastr';

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
}
