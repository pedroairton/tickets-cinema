import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Movie } from '../../../core/models/movie.model';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatRadioModule],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.scss',
})
export class MovieDetail {
  isEditMode = signal(false)
  movieId?: number
  movie = signal<Movie | null>(null)
  private adminService = inject(AdminService)
  private toastr = inject(ToastrService)
  movieForm = {}

  constructor(private route: ActivatedRoute) {
    this.movieId = this.route.snapshot.params['id'];
    this.isEditMode.set(!!this.movieId);
    console.log(this.movieId);
  }

  ngOnInit() {
    this.loadMovie()
  }

  loadMovie(){
    if(!this.movieId) return
    this.adminService.getMovieById(this.movieId).subscribe({
      next: (res) => {
        console.log(res);
        this.movie.set(res);
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Erro ao carregar o filme');
      }
    })
  }
}
