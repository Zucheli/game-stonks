import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  hasLogin(form: any) {
    let user = form.value.user;
    let password = form.value.password;
    if (user == '' || password == '') {
      Swal.fire({
        title: 'Atenção!',
        text: 'Preencha todos os campos para fazer o login!',
        icon: 'error',
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
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      })
    );
  }
}
