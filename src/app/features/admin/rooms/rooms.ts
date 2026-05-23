import { Component, inject, signal } from '@angular/core';
import { Room } from '../../../core/models/room.model';
import { AdminService } from '../../../core/services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rooms',
  imports: [],
  templateUrl: './rooms.html',
  styleUrl: './rooms.scss',
})
export class Rooms {
  rooms = signal<Room[]>([]);
  private adminService = inject(AdminService)
  private toastr = inject(ToastrService)

  ngOnInit() {
    this.loadRooms();
  }
  loadRooms(){
    this.adminService.getRooms().subscribe({
      next: (res: {data: Room[]}) => {
        this.rooms.set(res.data);
        console.log(this.rooms);
      },

      error: (err) => {
        console.log(err);
        this.toastr.error('Erro ao carregar as salas');
      }
    })
  }
}
