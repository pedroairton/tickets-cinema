import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { DatePipe } from '@angular/common';
import { Movie } from '../../../core/models/movie.model';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [
    DatePipe,
    RouterLink,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private apiService = inject(ApiService);
  private toastr = inject(ToastrService);
  date = signal(this.formatDate(new Date()));
  movies = signal<Movie[]>([]);
  private fb = inject(FormBuilder);
  dateForm: FormGroup
  storageUrl = environment.storageUrl

  constructor() {
    console.log(this.date())
    this.dateForm = this.fb.group({
      date: [this.date(), [Validators.required]],
    });
  }

  ngOnInit() {
    this.apiService.getScreeningsByDate(this.date()).subscribe({
      next: (res: any) => {
        this.movies.set(res.data);
        console.log(this.movies());
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Erro ao carregar os filmes');
      },
    });
  }
  onSubmit(){
    if (!this.dateForm.valid) {
      return;
    }
    const dateString = this.dateForm.value.date.toISOString().split('T')[0];
    this.apiService.getScreeningsByDate(dateString).subscribe({
      next: (res: any) => {
        this.movies.set(res.data);
        console.log(this.movies());
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Erro ao carregar os filmes');
      },
    });
  }
  formatDate(date: Date) {
    return date.toISOString().split('T')[0];
  }
  convertMinutes(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
  }
}
