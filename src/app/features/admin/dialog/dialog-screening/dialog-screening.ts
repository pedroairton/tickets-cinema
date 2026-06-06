import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AdminService } from '../../../../core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Room } from '../../../../core/models/room.model';
import { Movie } from '../../../../core/models/movie.model';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-screening',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog-screening.html',
  styleUrl: './dialog-screening.scss',
})
export class DialogScreening {
  readonly data = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<DialogScreening>);
  private fb = inject(FormBuilder);
  screeningForm: FormGroup;
  private adminService = inject(AdminService);
  private toastr = inject(ToastrService);
  rooms = signal<Room[]>([]);
  movies = signal<Movie[]>([]);
  isEditMode = signal(false);

  constructor() {
    console.log(this.data, this.isEditMode());

    const screening = this.data.screening;
    const room = this.data.room;

    console.log(room?.room_id, screening?.movie.id);

    this.isEditMode.set(!!screening);

    this.screeningForm = this.fb.group({
      room_id: [room?.room_id || '', [Validators.required]],
      movie_id: [screening?.movie.id || '', [Validators.required]],
      start_time: [
        screening?.start_time ? this.toDateTimeLocal(screening.start_time) : '',
        [Validators.required],
      ],
      end_time: [
        screening?.end_time ? this.toDateTimeLocal(screening.end_time) : '',
        [Validators.required],
      ],
      price: [screening?.price || '', [Validators.required]],
    });
  }

  ngOnInit() {
    this.loadRooms();
    this.loadShowingMovies();
  }

  loadRooms() {
    this.adminService.getRooms().subscribe({
      next: (res) => {
        // console.log(res);
        this.rooms.set(res.data);
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      },
    });
  }

  loadShowingMovies() {
    this.adminService.getMovies({ status: 'showing' }).subscribe({
      next: (res) => {
        // console.log(res);
        this.movies.set(res.data);
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      },
    });
  }

  onSubmit() {
    console.log(this.screeningForm.value);
    if (this.screeningForm.invalid) {
      this.toastr.warning('Preencha todos os campos');
      return;
    }
    if (this.isEditMode()) {
      this.adminService
        .updateScreening(this.screeningForm.value, this.data.screening.id)
        .subscribe({
          next: (res) => {
            this.dialogRef.close(res);
          },
          error: (err) => {
            this.toastr.error(err.error.message);
          },
        });
    } else {
      this.adminService.createScreening(this.screeningForm.value).subscribe({
        next: (res) => {
          this.dialogRef.close(res);
        },
        error: (err) => {
          this.toastr.error(err.error.message);
        },
      });
    }
  }
  toDateTimeLocal(dateString: string): string {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}
