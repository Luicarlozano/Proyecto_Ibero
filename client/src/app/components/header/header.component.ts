import { Component, inject } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
 private router = inject(Router);
 private authService = inject(AuthService);

  constructor() {}

  logout() {
    this.authService.removeToken();
    this.router.navigate(['/']);
  }

}
