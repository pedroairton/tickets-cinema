import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  user: User | null = null;
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  constructor() {
    this.user = this.getUser();
    console.log(this.user);
  }
  getUser() {
    const authUser = localStorage.getItem('auth_user');
    if (authUser) {
      return JSON.parse(authUser);
    }
  }
  logout() {
    if (!confirm('Deseja realmente sair?')) return;
    this.authService.logout().subscribe({
      next: () => {
        alert('Deslogado com sucesso!');
        window.location.reload();
        // this.router.navigate(['/login']);
      },
      error: () => {
        this.toastr.error('Erro ao deslogar');
      },
    });
  }
}
