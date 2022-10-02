import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

// Auth
import { AuthService } from '../../core/service/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  subscription: Subscription = new Subscription();

  bigPubli: boolean = false;
  hasHeader: boolean = false;

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
