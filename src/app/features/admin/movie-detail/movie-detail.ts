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
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  private fb = inject(FormBuilder)
  movieForm: FormGroup


  constructor(private route: ActivatedRoute) {
    this.movieId = this.route.snapshot.params['id'];
    this.isEditMode.set(!!this.movieId);
    console.log(this.movieId);

    this.movieForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      synopsis: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      duration: ['', [Validators.required, Validators.min(5), Validators.max(600)]],
      age_rating: ['', [Validators.required]],
      original_title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      director: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      distributor: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      country_of_origin: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      release_date: ['', [Validators.required]],
      status: ['', [Validators.required]],
    })
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
  onFileSelected(e: any){
    console.log(e)
  }
  removeImage(){
    console.log(this.movie());
    // this.movie.set({
    //   ...this.movie(),
    //   image_url: null
    // })
  }
}
