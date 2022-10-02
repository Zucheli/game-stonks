import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

// Auth
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
})
export class ProfileComponent implements OnInit {
  subscription: Subscription = new Subscription();

  bigPubli: boolean = false;
  viewPasswordUpdateModal: boolean = false;

  userFirstName: string = '';
  userLastName: string = '';
  userCpf: string = '';
  userEmail: string = '';
  userPassword: string = '';
  userLevel: number = 0;
  userGames: any[] = [];
  userExperience: number = 0;
  userOpenToWork: boolean = false;
  userDescription: string = '';

  userFirstNameUp: string = '';
  userLastNameUp: string = '';
  userCpfUp: string = '';
  userEmailUp: string = '';
  userPasswordUp: string = '';
  userLevelUp: number = 0;
  userGamesUp: any[] = [];
  userExperienceUp: number = 0;
  userOpenToWorkUp: boolean = false;
  userDescriptionUp: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserInfos();
  }

  getUserInfos() {
    this.authService.getUserInformation().subscribe({
      next: (response) => {
        this.userFirstName = response.firstName;
        this.userLastName = response.lastName;
        this.userCpf = response.cpf;
        this.userEmail = response.email;
        this.userPassword = response.password;
        this.userLevel = response.level;
        this.userGames = response.games;
        this.userExperience = response.yearsOfExperience;
        this.userOpenToWork = response.openToWork;
        this.userDescription = response.playerDescription;

        this.userFirstNameUp = response.firstName;
        this.userLastNameUp = response.lastName;
        this.userCpfUp = response.cpf;
        this.userEmailUp = response.email;
        this.userPasswordUp = response.password;
        this.userLevelUp = response.level;
        this.userGamesUp = response.games;
        this.userExperienceUp = response.yearsOfExperience;
        this.userOpenToWorkUp = response.openToWork;
        this.userDescriptionUp = response.playerDescription;
      },
      error: (error) => {
        Swal.fire({
          text: 'Não foi possível obter o perfil!',
          icon: 'error',
        });
      },
    });
  }

  editProfile() {
    let modal = document.getElementById('modalUpdate');
    if (modal != undefined) {
      modal.style.display = 'flex';
    }
  }

  closeModal() {
    let modal = document.getElementById('modalUpdate');
    if (modal != undefined) {
      modal.style.display = 'none';
    }

    this.getUserInfos();
  }

  updateAccount(form: any) {
    let email = form.value.emailModalUp;
    let password = form.value.passwordModalUp;
    let firstName = form.value.firstNameModalUp;
    let lastName = form.value.lastNameModalUp;
    let description = form.value.descriptionModalUp;
    let cpf = form.value.cpfModalUp;
    let experience = form.value.experienceModalUp;
    let level = form.value.levelModalUp;

    let levelConvert = Number(level);
    let experienceConvert = Number(experience);

    if (email == '' || firstName == '' || lastName == '' || cpf == '') {
      Swal.fire({
        text: 'Preencha todos os campos com (*) para salvar!',
        icon: 'warning',
      });

      this.getUserInfos();
    } else if (password != '') {
      let request = {
        cpf: cpf,
        email: email,
        firstName: firstName,
        lastName: lastName,
        level: levelConvert,
        password: password,
        playerDescription: description,
        yearsOfExperience: experienceConvert,
      };

      this.authService.updateAccount(request).subscribe({
        next: (response) => {
          Swal.fire({
            text: 'Dados alterados com sucesso!',
            icon: 'success',
          });
          this.closeModal();
        },
        error: (error) => {
          Swal.fire({
            text: 'Erro ao salvar alterações!',
            icon: 'error',
          });
        },
      });
    } else {
      let request = {
        cpf: cpf,
        email: email,
        firstName: firstName,
        lastName: lastName,
        level: levelConvert,
        playerDescription: description,
        yearsOfExperience: experienceConvert,
      };

      this.authService.updateAccount(request).subscribe({
        next: (response) => {
          Swal.fire({
            text: 'Dados alterados com sucesso!',
            icon: 'success',
          });
          this.closeModal();
        },
        error: (error) => {
          Swal.fire({
            text: 'Erro ao salvar alterações!',
            icon: 'error',
          });
        },
      });
    }
  }
}
