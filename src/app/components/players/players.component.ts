import { formatDate } from '@angular/common';
import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

// Auth
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.less'],
})
export class PlayersComponent implements OnInit {
  subscription: Subscription = new Subscription();

  bigPubli: boolean = false;
  hasHeader: boolean = true;
  arrayPlayers: any[] = [];

  playerId: any;

  constructor(
    private authService: AuthService,
    @Inject(LOCALE_ID) public locale: string
  ) {}

  ngOnInit(): void {
    this.getListPlayers();
  }

  getListPlayers() {
    this.authService.getListPlayers().subscribe({
      next: (response) => {
        this.arrayPlayers = response;
      },
      error: (error) => {
        Swal.fire({
          text: 'Não foi possível obter a lista de vagas abertas!',
          icon: 'error',
        });
      },
    });
  }

  invitePlayer(player: any) {
    this.playerId = player.id;

    this.authService.invitePlayer(this.playerId).subscribe({
      next: (response) => {
        Swal.fire({
          text: 'Jogador convidado com sucesso!',
          icon: 'success',
        });
      },
      error: (error) => {
        Swal.fire({
          text: 'Erro ao convidar jogador!',
          icon: 'error',
        });
      },
    });
  }
}
