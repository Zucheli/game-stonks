import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

// Auth
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  subscription: Subscription = new Subscription();

  bigPubli: boolean = true;
  hasHeader: boolean = false;
  viewPassword: boolean = false;

  user: string = '';
  password: string = '';

  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit(): void {}

  hasLogin(form: any) {
    let user = form.value.user;
    let password = form.value.password;
    if (user == '' || password == '') {
      Swal.fire({
        text: 'Preencha todos os campos para fazer o login!',
        icon: 'warning',
      });
    } else {
      let login = {
        username: user,
        password: password,
      };
      this.doLogin(login);
    }
  }

  doLogin(login: any) {
    this.subscription.add(
      this.authService.login(login).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.access_token);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          Swal.fire({
            text: 'Usuário não cadastrado, por favor se cadastre!',
            icon: 'error',
          });
        },
      })
    );
  }

  modalCreateAccount() {}
}
