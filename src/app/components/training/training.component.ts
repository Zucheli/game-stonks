import { formatDate, WeekDay } from '@angular/common';
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

  cardId: number = 0;
  cardName: string = '';
  cardGame: string = '';
  cardResponsible: string = '';
  cardStartDate: string = '';
  cardEndDate: string = '';
  cardDescription: string = '';

  constructor(
    private authService: AuthService,
    @Inject(LOCALE_ID) public locale: string
  ) {}

  ngOnInit(): void {
    this.getListRooms();
  }

  getListRooms() {
    this.authService.getListRooms().subscribe({
      next: (response) => {
        this.arrayRooms = response;
        console.log(this.arrayRooms);
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

    this.getListRooms();
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
    let weekDaysSelect = [];
    let weekDays = [
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
    ];

    for (let i = 0; i < weekDays.length; i++) {
      if (weekDays[i] != '') {
        weekDaysSelect.push(weekDays[i]);
      }
    }

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
        weekDays: weekDaysSelect,
      };

      this.authService.createRoom(request).subscribe({
        next: (response) => {
          Swal.fire({
            text: 'Sala criada com sucesso',
            icon: 'success',
          });
          this.closeModal();
        },
        error: (error) => {
          Swal.fire({
            text: 'Erro ao criar sala!',
            icon: 'error',
          });
        },
      });
    }
  }

  openDetail(room: any) {
    var card = document.getElementById('card');
    if (card != undefined) {
      card.style.display = 'grid';
    }

    this.cardId = room.id;
    this.cardName = room.trainingRoomName;
    this.cardGame = room.game;
    this.cardResponsible = room.responsible;
    this.cardDescription = room.trainingRoomDescription;
    this.cardStartDate = formatDate(room.startDate, 'dd-MM-yyyy', this.locale);
    this.cardEndDate = formatDate(room.endDate, 'dd-MM-yyyy', this.locale);
  }

  applyRoom(cardId: any) {
    this.authService.applyRoom(cardId).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
