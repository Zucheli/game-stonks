import { formatDate } from '@angular/common';
import { Component, OnInit, LOCALE_ID, NgModule, Inject } from '@angular/core';
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

  teamName: string = '';
  teamGame: string = '';
  vacancyName: string = '';
  vacancyDescription: string = '';
  vacancyEndDate: string = '';
  vacancyStartDate: string = '';

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
        console.log(response);
        this.arrayJobs = response;
      },
      error: (error) => {
        Swal.fire({
          title: 'Atenção!',
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
  }

  // loginUser(email: string) {
  //   this.subscription.add(
  //     this.authService.loginUser(email).subscribe({
  //       next: (response) => {
  //         let user = this.user();
  //         this.saveUser(user);
  //         this.displayContainer = 'none';
  //         this.displayLive = 'grid';
  //       },
  //       error: (error) => {
  //         Swal.fire({
  //           title: 'Atenção!',
  //           text: 'Email não cadastrado, entre em contato conosco pelo chat!',
  //           icon: 'error',
  //         });
  //       },
  //     })
  //   );
  // }
}
