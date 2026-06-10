import { Component, inject, signal } from '@angular/core';
import { Room } from '../../../core/models/room.model';
import { AdminService } from '../../../core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DialogRooms } from '../dialog/dialog-rooms/dialog-rooms';
import { LoadingComponent } from "../../../shared/loading/loading.component";

@Component({
  selector: 'app-rooms',
  imports: [LoadingComponent],
  templateUrl: './rooms.html',
  styleUrl: './rooms.scss',
})
export class Rooms {
  rooms = signal<Room[]>([]);
  isLoading = signal(false);
  private adminService = inject(AdminService);
  private toastr = inject(ToastrService);

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.loadRooms();
  }
  loadRooms() {
    this.isLoading.set(true);
    this.adminService.getRooms().subscribe({
      next: (res: { data: Room[] }) => {
        this.isLoading.set(false);
        this.rooms.set(res.data);
        console.log(this.rooms);
      },

      error: (err) => {
        console.log(err);
        this.toastr.error('Erro ao carregar as salas');
        this.isLoading.set(false);
      },
    });
  }
  updateRoomStatus(roomId: number, newStatus: boolean) {
    this.adminService.updateRoomStatus(roomId, newStatus).subscribe({
      next: (res) => {
        this.loadRooms();
        this.toastr.success('Sala atualizada com sucesso!');
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Erro ao atualizar a sala');
      },
    });
  }

  openDialog(room: Room): void {
    const dialogRef = this.dialog.open(DialogRooms, {
      width: '500px',
      data: {
        room: room,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadRooms();
      }
    });
  }
}
