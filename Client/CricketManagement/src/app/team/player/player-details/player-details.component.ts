import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/players.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {
  player = {};
  constructor(private movieService: PlayersService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    activatedRoute.queryParams
      .subscribe(params => {
        const playerId = params['id'];
        console.log(`id: ${playerId}`);
        this.movieService
          .getDetails(playerId)
          .subscribe(response => {
            const body = response.json();
            if (body['status'] == 'success') {
              this.player = body.data;
            }
          });
      });
  }

  ngOnInit() {
  }
  getBack() {
    this.router.navigate(['/player']);
  }
}
