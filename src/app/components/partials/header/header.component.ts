import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

// Auth
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  subscription: Subscription = new Subscription();

  roleType: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserInfos();
  }

  getUserInfos() {
    this.authService.getUserInformation().subscribe({
      next: (response) => {
        this.roleType = response.roleDto.authority;
      },
      error: (error) => {
        Swal.fire({
          text: 'Não foi possível obter o usuário!',
          icon: 'error',
        });
      },
    });
  }
}
