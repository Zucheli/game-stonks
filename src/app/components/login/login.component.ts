import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
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
  viewPasswordModal: boolean = false;

  user: string = '';
  password: string = '';

  emailModal: string = '';
  passwordModal: string = '';
  firstNameModal: string = '';
  lastNameModal: string = '';
  cpfModal: string = '';
  roleTeamType: string = '';
  openToWorkModal: any;
  roleId: number = 0;

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
    this.authService.login(login).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.access_token);
        this.authService.getUserInformation().subscribe({
          next: (response) => {
            localStorage.setItem('role', response.roleDto.authority);
            this.router.navigate(['/home']);
          },
        });
      },
      error: (error) => {
        Swal.fire({
          text: 'Usuário não cadastrado, por favor se cadastre!',
          icon: 'error',
        });
      },
    });
  }

  createAccount(form: any) {
    let email = form.value.emailModal;
    let password = form.value.passwordModal;
    let firstName = form.value.firstNameModal;
    let lastName = form.value.lastNameModal;
    let cpf = form.value.cpfModal;
    let roleType = form.value.roleType;
    let openToWork = form.value.openToWorkModal;

    if (
      email == '' ||
      password == '' ||
      firstName == '' ||
      lastName == '' ||
      cpf == '' ||
      roleType == '' ||
      openToWork == ''
    ) {
      Swal.fire({
        text: 'Preencha todos os campos para criar uma conta',
        icon: 'warning',
      });
    } else {
      openToWork == 'true' ? true : false;
      roleType == 'ROLE_PLAYER' ? (this.roleId = 1) : (this.roleId = 2);

      let postAccount = {
        cpf: cpf,
        email: email,
        firstName: firstName,
        lastName: lastName,
        openToWork: openToWork,
        password: password,
        roleDto: {
          authority: roleType,
          id: this.roleId,
        },
      };

      this.authService.creatAccount(postAccount).subscribe({
        next: (response) => {
          Swal.fire({
            text: 'Usuário cadastrado com sucesso!',
            icon: 'success',
          });
          this.closeModal();
        },
        error: (error) => {
          Swal.fire({
            text: 'Usuário já cadastrado!',
            icon: 'error',
          });
        },
      });
    }
  }

  modalCreateAccount() {
    let modal = document.getElementById('modalAccount');
    if (modal != undefined) {
      modal.style.display = 'flex';
    }
  }

  closeModal() {
    let modal = document.getElementById('modalAccount');
    if (modal != undefined) {
      modal.style.display = 'none';
    }
  }
}
