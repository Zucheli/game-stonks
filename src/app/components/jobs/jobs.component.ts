import { formatDate } from '@angular/common';
import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

// Auth
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.less'],
})
export class JobsComponent implements OnInit {
  subscription: Subscription = new Subscription();

  bigPubli: boolean = false;
  hasHeader: boolean = true;
  arrayJobs: any[] = [];

  teamId: number = 0;
  teamName: string = '';
  teamGame: string = '';
  teamDescription: string = '';

  vacancyId: number = 0;
  vacancyName: string = '';
  vacancyDescription: string = '';
  vacancyEndDate: string = '';
  vacancyStartDate: string = '';
  vacancysDtoName: string = '';
  vacancysDtoDescription: string = '';

  constructor(
    private authService: AuthService,
    @Inject(LOCALE_ID) public locale: string
  ) {}

  ngOnInit(): void {
    this.getListJobs();
  }

  getListJobs() {
    this.authService.getListJobs().subscribe({
      next: (response) => {
        this.arrayJobs = response;
      },
      error: (error) => {
        Swal.fire({
          text: 'Não foi possível obter a lista de vagas abertas!',
          icon: 'error',
        });
      },
    });
  }

  openDetail(job: any) {
    var card = document.getElementById('card');
    if (card != undefined) {
      card.style.display = 'grid';
    }

    this.teamId = job.teamId;
    this.teamName = job.teamName;
    this.teamGame = job.games;
    this.vacancyName = job.vacancyName;
    this.vacancyDescription = job.vacancyDescription;
    this.vacancyStartDate = formatDate(
      job.vacancyStartDate,
      'dd-MM-yyyy',
      this.locale
    );
    this.vacancyEndDate = formatDate(
      job.vacancyEndDate,
      'dd-MM-yyyy',
      this.locale
    );

    this.getTeam();
  }

  openTeamDetail() {
    let modal = document.getElementById('modalTeam');
    if (modal != undefined) {
      modal.style.display = 'flex';
    }
  }

  closeModal() {
    let modal = document.getElementById('modalTeam');
    if (modal != undefined) {
      modal.style.display = 'none';
    }
  }

  getTeam() {
    this.authService.getTeam(this.teamId).subscribe({
      next: (response) => {
        this.vacancysDtoName = response.vacancyDto.name;
        this.vacancysDtoDescription = response.vacancyDto.description;
        this.vacancyId = response.vacancyDto.id;
        this.teamDescription = response.description;
      },
    });
  }

  applyVacancy() {
    let infos = {
      teamId: this.teamId,
      vacancyId: this.vacancyId,
    };

    this.authService.applyVacancy(infos).subscribe({
      next: (response) => {
        Swal.fire({
          text: 'Candidatura realizada com sucesso!',
          icon: 'success',
        });
      },
      error: (error) => {
        Swal.fire({
          text: 'Você ja se candidatou para essa vaga!',
          icon: 'error',
        });
      },
    });
  }
}
