import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Genre, Movie } from '../../../core/models/movie.model';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-movie-detail',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
  ],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.scss',
})
export class MovieDetail {
  storageUrl = environment.storageUrl;
  isEditMode = signal(false);
  movieId?: number;
  movie = signal<Movie | null>(null);
  genres = signal<Genre[]>([]);
  private adminService = inject(AdminService);
  private toastr = inject(ToastrService);

  private fb = inject(FormBuilder);
  movieForm: FormGroup;
  mainImageFile: File | null = null;
  mainImagePreview: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.movieId = this.route.snapshot.params['id'];
    this.isEditMode.set(!!this.movieId);
    console.log(this.movieId);

    this.movieForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      synopsis: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      duration_minutes: ['', [Validators.required, Validators.min(5), Validators.max(600)]],
      genres_ids: [[], [Validators.required]],
      age_rating: ['', [Validators.required]],
      original_title: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
      ],
      director: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      distributor: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      country_of_origin: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
      ],
      release_date: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.loadMovie();
    this.loadGenres();
  }

  loadMovie() {
    if (!this.movieId) return;
    this.adminService.getMovieById(this.movieId).subscribe({
      next: (res) => {
        const movie = res.data;
        this.movie.set(movie);
        console.log(this.movie());
        this.movieForm.patchValue({
          title: movie.title,
          synopsis: movie.synopsis,
          duration_minutes: movie.duration_minutes,
          genres_ids: movie.genres.map((genre: Genre) => genre.id),
          age_rating: movie.age_rating,
          original_title: movie.original_title,
          director: movie.director,
          distributor: movie.distributor,
          country_of_origin: movie.country_of_origin,
          release_date: movie.release_date.split('T')[0],
          status: movie.status,
        });
        this.mainImagePreview = this.storageUrl +'/'+ movie.image_url;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Erro ao carregar o filme');
      },
    });
  }
  loadGenres() {
    this.adminService.getGenres().subscribe({
      next: (res: any) => {
        this.genres.set(res.data);
        console.log(this.genres());
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Erro ao carregar os gêneros de filmes');
      },
    });
  }
  onSubmit() {
    if (this.movieForm.invalid) {
      this.movieForm.markAllAsTouched();
      return;
    }

    const formData = this.buildFormData();

    if (this.isEditMode() && this.movieId) {
      this.adminService.updateMovie(this.movieId, formData).subscribe({
        next: () => {
          this.toastr.success('Filme atualizado com sucesso');
          this.router.navigate(['/admin/filmes']);
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('Erro ao atualizar o filme');
        },
      });
    } else {
      this.adminService.createMovie(formData).subscribe({
        next: () => {
          this.toastr.success('Filme criado com sucesso');
          this.router.navigate(['/admin/filmes']);
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('Erro ao criar o filme');
        },
      });
    }
  }
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    const file = input.files[0];

    this.mainImageFile = file;
    this.mainImagePreview = URL.createObjectURL(file);
  }
  removeImage() {
    this.mainImageFile = null;
    this.mainImagePreview = null;
  }
  cancel() {
    this.router.navigate(['/admin/filmes']);
  }
  private buildFormData(): FormData {
    const formData = new FormData();

    Object.entries(this.movieForm.value).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(`${key}[]`, String(item));
        });
      } else {
        formData.append(key, String(value));
      }
    });

    if (this.mainImageFile) {
      formData.append('image', this.mainImageFile);
    }

    return formData;
  }
}
