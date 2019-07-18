import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayersService } from 'src/app/players.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  isGrid = true;
  players = [];

  constructor(
    private router: Router,
    private playerService: PlayersService
  ) { 
    this.loadPlayers();
  }

  ngOnInit() {
  }
  onSelectPlayer(player) {
     this.router.navigate(['/player-details'], { queryParams: { id: player.Player_Id } });
  }
  showGrid() {
    this.isGrid = true;
  }
  toggleGrid() {
    this.isGrid = !this.isGrid;
  }
  showList() {
    this.isGrid = false;
  }
  onDelete(player) {
    const result = confirm('Are you sure you want to remove this Player?');
    if (result) {
      this.playerService
        .delete(player.Player_Id)
        .subscribe(response => {
          const body = response.json();
          if (body['status'] == 'success') {
            this.loadPlayers();
          }
        })
    }
  }

  loadPlayers() {
    this.playerService
      .get()
      .subscribe(response => {
        const body = response.json();
        this.players = body.data;
      });
  }

  onAddPlayer() {
    this.router.navigate(['/add-player']);
  }
}
