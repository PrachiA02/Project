import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersService } from 'src/app/players.service';
import { MatchesService } from 'src/app/matches.service';
import { TeamService } from 'src/app/team.service';
import { forkJoin } from 'rxjs';
import { TeamPlayerMappingService } from 'src/app/team-player-mapping.service';
import { ScoreService } from 'src/app/score.service';

@Component({
  selector: 'app-update-score',
  templateUrl: './update-score.component.html',
  styleUrls: ['./update-score.component.css']
})
export class UpdateScoreComponent implements OnInit {
  batmanDropdownSettings = {};
  batId = [];
  ballerId = [];
  battingTeamId: number;
  matchId: number;
  teamAId: number;
  teamBId: number;
  teamAName: string;
  teamBName: string;
  matchType: string;
  allTeams = [];
  teamAPlayers = [];
  teamBPlayers = [];
  overs: number;
  balls: number;
  runs: number;
  wickets: number;
  discription: string;
  teamAScore: any;
  teamBScore: any;

  constructor(private activatedRoute: ActivatedRoute,
    private playerService: PlayersService,
    private matchService: MatchesService,
    private teamService: TeamService,
    private teamPlayerMappingService: TeamPlayerMappingService,
    private scoreService: ScoreService,
    private router: Router) {
    activatedRoute.queryParams
      .subscribe(params => {
        this.matchId = params['id'];

        let matchRequest = this.matchService.getDetails(this.matchId);
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
            let teamA: any;
            let teamB: any;
            if (matchesResponseBody.data.Batting_Team === matchesResponseBody.data.Team_A) {
              teamA = this.getTeamDetails(matchesResponseBody.data.Team_A);
              teamB = this.getTeamDetails(matchesResponseBody.data.Team_B);
            } else {
              teamA = this.getTeamDetails(matchesResponseBody.data.Team_B);
              teamB = this.getTeamDetails(matchesResponseBody.data.Team_A);
            }

            this.matchType = matchesResponseBody.data.Match_Type;
            this.teamAId = teamA.teamId;
            this.teamAName = teamA.teamName;
            this.teamBId = teamB.teamId;
            this.teamBName = teamB.teamName;
            this.battingTeamId = matchesResponseBody.data.Batting_Team;
            this.getPlayersForBothTeams();
            this.getUpdatedScore();
            this.getOtherTeamScore();
          });
      });
  }

  ngOnInit() {
    this.batmanDropdownSettings = {
      singleSelection: true,
      idField: 'playerId',
      textField: 'playerName',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };
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

  private getPlayersForBothTeams() {
    let battingTeam: number;
    let bowlingTeam: number;
    if (this.battingTeamId === this.teamAId) {
      battingTeam = this.teamAId;
      bowlingTeam = this.teamBId;
    } else {
      battingTeam = this.teamBId;
      bowlingTeam = this.teamAId;
    }

    let teamAPlayersRequest = this.teamPlayerMappingService.getPlayersByTeamId(battingTeam);
    let teamBPlayersRequest = this.teamPlayerMappingService.getPlayersByTeamId(bowlingTeam);
    forkJoin(teamAPlayersRequest, teamBPlayersRequest)
      .subscribe(response => {
        let teamAPlayersResponse = response[0].json();
        this.teamAPlayers = [];
        teamAPlayersResponse.data.forEach(player => {
          this.teamAPlayers.push({
            playerId: player.Player_Id,
            playerName: player.Player_Name
          });
        });

        let teamBPlayersResponse = response[1].json();
        this.teamBPlayers = [];
        teamBPlayersResponse.data.forEach(player => {
          this.teamBPlayers.push({
            playerId: player.Player_Id,
            playerName: player.Player_Name
          });
        });
      });
  }
  onSave() {
    if (this.batId === undefined || this.batId.length === 0) {
      alert('Please select Battsman');
    } else if (this.ballerId === undefined || this.ballerId.length === 0) {
      alert('Please select baller');
    } else if (this.runs === undefined) {
      alert('Please enter valid runs');
    } else if (this.overs === undefined) {
      alert('Please enter valid overs');
    } else {
      this.wickets = this.wickets ? this.wickets : 0;
      this.discription = this.discription ? this.discription : '';
      this.scoreService
        .post(this.matchId, this.overs, this.balls, this.runs, this.batId[0].playerId, this.ballerId[0].playerId,
          this.wickets, this.battingTeamId, this.discription)
        .subscribe(response => {
          console.log(response);
          const body = response.json();
          if (body['status'] == 'success') {
            this.discription = "";
            this.runs = undefined;
            this.wickets = undefined;
            this.balls = undefined;
            this.overs = undefined;
            this.getUpdatedScore();
          } else {
            alert(body['error']);
          }
        });
    }
  }

  private getUpdatedScore() {
    this.scoreService.getScoreByMatchId(this.matchId, this.battingTeamId)
      .subscribe(response => {
        let scoreResponse = response.json();
        let overs = Math.floor(scoreResponse.data.Balls / 6);
        let balls = scoreResponse.data.Balls % 6;
        this.teamAScore = {
          runs: scoreResponse.data.Runs,
          wickets: scoreResponse.data.Wickets,
          overs: overs + '.' + balls
        };
      });
  }
  private getOtherTeamScore() {
    this.scoreService.getScoreByMatchId(this.matchId, this.teamBId)
      .subscribe(response => {
        let scoreResponse = response.json();
        let overs = Math.floor(scoreResponse.data.Balls / 6);
        let balls = scoreResponse.data.Balls % 6;
        this.teamBScore = {
          runs: scoreResponse.data.Runs,
          wickets: scoreResponse.data.Wickets,
          overs: overs + '.' + balls
        };
      });
  }
  onCancel() {
    this.router.navigate(['/matches'], { queryParams: { id: this.matchId } });
  }

  onChnageInning() {
    let battingTeam: number;
    if (this.battingTeamId === this.teamAId) {
      battingTeam = this.teamBId;
    } else {
      battingTeam = this.teamAId;
    }
    this.matchService.changeInning(this.matchId, battingTeam)
      .subscribe(response => {

        const body = response.json();
        if (body['status'] == 'success') {
          window.location.reload();
        } else {
          alert(body['error']);
        }
      });
  }

  onFinishMatch() {
    let winningTeam;
    let winningTeamName = '';
    if (this.teamAScore.runs > this.teamBScore.runs) {
      winningTeam = this.teamAId;
      winningTeamName = this.teamAName;
    } else if (this.teamAScore.runs < this.teamBScore.runs) {
      winningTeam = this.teamBId;
      winningTeamName = this.teamBName;
    } else {
      winningTeam = null;
    }
    this.matchService.changeStatus(this.matchId, winningTeam)
      .subscribe(response => {
        const body = response.json();
        if (body['status'] == 'success') {
          alert('Match Completed Success! Congratulations ' + winningTeamName);
          this.router.navigate(['/home']);
        } else {
          alert(body['error']);
        }
      })
  }
}
