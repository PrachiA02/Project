import { Component, OnInit } from '@angular/core';
import { ScoreService } from 'src/app/score.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchesService } from 'src/app/matches.service';
import { TeamService } from 'src/app/team.service';
import { forkJoin } from 'rxjs';
import { TeamPlayerMappingService } from 'src/app/team-player-mapping.service';

@Component({
  selector: 'app-view-score',
  templateUrl: './view-score.component.html',
  styleUrls: ['./view-score.component.css']
})
export class ViewScoreComponent implements OnInit {
  matchId: number;
  teamAScore: any;
  teamBScore: any;
  battingTeamId: number;
  winningTeamId: number;
  teamBId: number;
  teamAId: number;
  allTeams = [];
  teamBName: string;
  teamAName: string;
  matchType: string;
  detailScoreA = [];
  detailScoreB = [];
  allPlayers = [];

  constructor(private scoreService: ScoreService,
    private activatedRoute: ActivatedRoute,
    private matchService: MatchesService,
    private teamService: TeamService,
    private teamPlayerMappingService: TeamPlayerMappingService,
    private router:Router) {
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
            this.winningTeamId = matchesResponseBody.data.Winning_Team
            this.getUpdatedScore();
            this.getOtherTeamScore();
            this.getPlayersForBothTeams();
            this.getUpdatedScoreDetails1();
            this.getUpdatedScoreDetails2();
          });
      });
  }

  ngOnInit() {
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
  private getUpdatedScoreDetails1() {
    this.scoreService.getRecentScoreByMatchId(this.matchId, this.teamAId)
      .subscribe(response => {
        let scoreResponse = response.json();
        this.detailScoreA = [];
        scoreResponse.data.forEach(score => {
          this.detailScoreA.push({
            run: score.Runs,
            wickets: score.Wickets,
            discription: score.Discription,
            batId: this.allPlayers[score.Bat_Id] ? this.allPlayers[score.Bat_Id] : score.Bat_Id,
            ballerId: this.allPlayers[score.Baller_Id] ? this.allPlayers[score.Baller_Id] : score.Baller_Id
          });
        });
      });
  }

  private getUpdatedScoreDetails2() {
    this.scoreService.getRecentScoreByMatchId(this.matchId, this.teamBId)
      .subscribe(response => {
        let scoreResponse = response.json();
        this.detailScoreB = [];
        scoreResponse.data.forEach(score => {
          this.detailScoreB.push({
            run: score.Runs,
            wickets: score.Wickets,
            discription: score.Discription,
            batId: this.allPlayers[score.Bat_Id] ? this.allPlayers[score.Bat_Id] : score.Bat_Id,
            ballerId: this.allPlayers[score.Baller_Id] ? this.allPlayers[score.Baller_Id] : score.Baller_Id
          });
        });
      });
  }
  private getPlayersForBothTeams() {
    let teamAPlayersRequest = this.teamPlayerMappingService.getPlayersByTeamId(this.teamAId);
    let teamBPlayersRequest = this.teamPlayerMappingService.getPlayersByTeamId(this.teamBId);
    forkJoin(teamAPlayersRequest, teamBPlayersRequest)
      .subscribe(response => {
        this.allPlayers = [];
        let teamAPlayersResponse = response[0].json();
        teamAPlayersResponse.data.forEach(player => {
          this.allPlayers[player.Player_Id] = player.Player_Name;
        });

        let teamBPlayersResponse = response[1].json();
        teamBPlayersResponse.data.forEach(player => {
          this.allPlayers[player.Player_Id] = player.Player_Name;
        });
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
  private getTeamDetails(teamId: number) {
    let teamDetails: any;
    this.allTeams.forEach(team => {
      if (team.teamId === teamId) {
        teamDetails = team;
      }
    });
    return teamDetails;
  }

  onBack(){
    this.router.navigate(['/matches']);
  }
}
