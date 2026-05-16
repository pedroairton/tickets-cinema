import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from "./shared/header/header";
import { Footer } from "./shared/footer/footer";
import { HeaderAdmin } from "./shared/header-admin/header-admin";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, HeaderAdmin],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tickets');
  isAdminRoute: boolean = false

  constructor(private router: Router){
    this.router.events.subscribe(() => {
      this.isAdminRoute = this.router.url.includes('admin')
    })
  }
}
