import { formatDate } from '@angular/common';
import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

// Auth
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.less'],
})
export class TrainingComponent implements OnInit {
  subscription: Subscription = new Subscription();

  bigPubli: boolean = false;
  hasHeader: boolean = true;
  arrayRooms: any[] = [];

  constructor(
    private authService: AuthService,
    @Inject(LOCALE_ID) public locale: string
  ) {}

  ngOnInit(): void {
    this.getListRooms();
    this.showModal();
  }

  getListRooms() {
    this.authService.getListRooms().subscribe({
      next: (response) => {
        this.arrayRooms = response;
      },
      error: (error) => {
        Swal.fire({
          text: 'Não foi possível obter a lista de vagas abertas!',
          icon: 'error',
        });
      },
    });
  }

  showModal() {
    let modal = document.getElementById('modalAddRoom');
    if (modal != undefined) {
      modal.style.display = 'flex';
    }
  }

  closeModal() {
    let modal = document.getElementById('modalAddRoom');
    if (modal != undefined) {
      modal.style.display = 'none';
    }
  }

  createRoom(form: any) {
    let name = form.value.nameModal;
    let game = form.value.gameModal;
    let dateStart = form.value.dateStartModal;
    let dateEnd = form.value.dateEndModal;
    let description = form.value.descriptionModal;
    let sunday = form.value.sundayModal == true ? 'SUNDAY' : '';
    let monday = form.value.mondayModal == true ? 'MONDAY' : '';
    let tuesday = form.value.tuesdayModal == true ? 'TUESDAY' : '';
    let wednesday = form.value.wednesdayModal == true ? 'WEDNESDAY' : '';
    let thursday = form.value.thursdayModal == true ? 'THURSDAY' : '';
    let friday = form.value.fridayModal == true ? 'FRIDAY' : '';
    let saturday = form.value.saturdayModal == true ? 'SATURDAY' : '';
    let weekDays = [
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
    ];

    if (
      name == '' ||
      game == '' ||
      dateStart == '' ||
      dateEnd == '' ||
      description == ''
    ) {
      Swal.fire({
        text: 'Preencha todos os campos para criar a sala!',
        icon: 'warning',
      });
    } else {
      let request = {
        description: description,
        endDate: dateEnd,
        game: game,
        name: name,
        startDate: dateStart,
        weekDays: weekDays,
      };

      this.authService.createRoom(request).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
