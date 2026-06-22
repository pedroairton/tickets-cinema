import { Component, inject, signal } from '@angular/core';
import { Genre, Movie } from '../../../core/models/movie.model';
import { ApiService } from '../../../core/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from "@angular/router";
import { environment } from '../../../../environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-movies',
  imports: [RouterLink, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
})
export class Movies {
  genres = signal<Genre[]>([])
  movies = signal<Movie[]>([])
  private apiService = inject(ApiService)
  private toastr = inject(ToastrService)
  storageUrl = environment.storageUrl
  private fb = inject(FormBuilder)
  filterForm = this.fb.group({
    input: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
  })
  ngOnInit() {
    // this.loadGenres()
    this.loadMovies()
  }
  loadGenres(){
    this.apiService.getGenres().subscribe({
      next: (res: any) => {
        this.genres.set(res.data);
        console.log(this.genres());
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Erro ao carregar os gêneros');
      },
    })
  }
  loadMovies(){
    this.apiService.getMovies({status: 'showing'}).subscribe({
      next: (res: any) => {
        this.movies.set(res.data);
        console.log(this.movies());
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Erro ao carregar os filmes');
      },
    })
  }
  search(){
    if(this.filterForm.value.input!.length < 3) return
    if (!this.filterForm.valid) {
      alert('Preencha corretamente o campo de busca');
      return;
    }
    this.apiService.searchMovies(this.filterForm.value.input as string).subscribe({
      next: (res: any) => {
        this.movies.set(res.data);
        console.log(this.movies());
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Erro ao carregar os filmes');
      },
    })
  }
}
