import { Component, OnInit } from '@angular/core';
import { MatchesService } from 'src/app/matches.service';
import { TeamService } from 'src/app/team.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-live-matches',
  templateUrl: './live-matches.component.html',
  styleUrls: ['./live-matches.component.css']
})
export class LiveMatchesComponent implements OnInit {

  liveMatches = [];
  allTeams = [];

  constructor(private matchService: MatchesService,
    private teamService: TeamService) {
    let matchRequest = this.matchService.getMatchesByStatus("LIVE");
    let teamRequest = this.teamService.get();
    forkJoin(teamRequest, matchRequest)
      .subscribe(response => {
        const teamResponseBody = response[0].json();
        this.allTeams = [];
        teamResponseBody.data.forEach(team => {
          this.allTeams.push({
            teamId: team.Team_Id,
            teamName: team.Team_Name,
            teamIcon: team.Team_Icon
          });
        });

        const matchesResponseBody = response[1].json();

        this.liveMatches = [];
        matchesResponseBody.data.forEach(liveMatch => {
          let teamA = this.getTeamDetails(liveMatch.Team_A);
          let teamB = this.getTeamDetails(liveMatch.Team_B);

          this.liveMatches.push({
            matchId: liveMatch.Match_Id,
            teamAName: teamA.teamName,
            teamAIcon: teamA.teamIcon,
            teamBName: teamB.teamName,
            teamBIcon: teamB.teamIcon
          });

        });
      });
  }

  ngOnInit() {
  }
  private getTeamDetails(teamId: number) {
    let teamDetails: any;
    this.allTeams.forEach(team => {
      if (team.teamId === teamId) {
        teamDetails = team;
      }
    });
    return teamDetails;
  }
}
