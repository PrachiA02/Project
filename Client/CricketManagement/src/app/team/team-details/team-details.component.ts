import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PlayersService } from 'src/app/players.service';
import { TeamPlayerMappingService } from 'src/app/team-player-mapping.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
  team = {
    Team_Id: 1
  };
  selectedItems = [];
  dropdownSettings = {};
  players = [];

  constructor(private teamService: TeamService,
    private playersService: PlayersService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private teamPlayerMappingService: TeamPlayerMappingService,
    private router: Router) {
    activatedRoute.queryParams
      .subscribe(params => {
        const teamId = params['id'];
        console.log(`id: ${teamId}`);
        let teamInfo = this.teamService.getDetails(teamId);
        let playersInfo = this.playersService.get();
        let teamPlayes = this.teamPlayerMappingService.get(teamId);
        forkJoin(teamInfo, playersInfo, teamPlayes).subscribe(response => {
          const teamResponse = response[0].json();
          if (teamResponse['status'] == 'success') {
            this.team = teamResponse.data;
          }

          const playersResponse = response[1].json();
          if (playersResponse['status'] == 'success') {
            this.players = [];
            playersResponse.data.forEach(player => {
              this.players.push({
                playerId: player.Player_Id,
                playerName: player.Player_Name
              });
            });

            const teamPlayersResponse = response[2].json();
            if (teamPlayersResponse['status'] == 'success') {
              this.selectedItems = [];
              teamPlayersResponse.data.forEach(teamPlayer => {
                this.selectedItems.push({
                  playerId: teamPlayer.Player_Id,
                  playerName: this.getPlayername(teamPlayer.Player_Id)
                });
              });
            }

          }
        });
      });
  }
  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'playerId',
      textField: 'playerName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onSave() {
    this.teamPlayerMappingService.delete(this.team.Team_Id).subscribe(response => {
      this.teamPlayerMappingService
        .post(this.team.Team_Id, this.selectedItems)
        .subscribe(response => {
          console.log(response);
          const body = response.json();
          if (body['status'] == 'success') {
            this.onCancel();
          } else {
            alert(body['error']);
          }
        });
    });
  }

  onCancel() {
    this.router.navigate(['/team']);
  }

  getPlayername(playerId: number) {
    let playerName;
    this.players.forEach(player => {
      if (player.playerId === playerId) {
        playerName = player.playerName;
      }
    });
    return playerName;
  }

  isUserLoggedIn() {
    return this.userService.isUserLogin();
  }
}
