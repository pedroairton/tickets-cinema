import { Component, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private apiService = inject(ApiService);
  screenings: any = [];

  ngOnInit() {
    this.apiService.getScreenings().subscribe({
      next: (res: any) => {
        this.screenings = res.data;
        console.log(this.screenings);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
