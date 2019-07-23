import { Component, OnInit } from '@angular/core';
import { ScoreService } from 'src/app/score.service';
import { ActivatedRoute } from '@angular/router';
import { MatchesService } from 'src/app/matches.service';
import { TeamService } from 'src/app/team.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-view-score',
  templateUrl: './view-score.component.html',
  styleUrls: ['./view-score.component.css']
})
export class ViewScoreComponent implements OnInit {
  matchId: number;
  teamAScore : any;
  teamBScore : any;
  battingTeamId : number;
  teamBId: number;
  teamAId: number;
  allTeams = [];
  teamBName : string;
  teamAName : string;
  matchType: string;
  detailScore = [];

  constructor(private scoreService: ScoreService,
    private activatedRoute: ActivatedRoute,
    private matchService: MatchesService,
    private teamService: TeamService) {
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
          let teamA : any;
          let teamB : any;
          if(matchesResponseBody.data.Batting_Team === matchesResponseBody.data.Team_A) {
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
            this.getUpdatedScore();
            this.getOtherTeamScore();
            this.getUpdatedScoreDetails();
          });
    });
  }

  ngOnInit() {
  }
  private getUpdatedScore(){
    this.scoreService.getScoreByMatchId(this.matchId, this.battingTeamId)
    .subscribe(response => {
      let scoreResponse = response.json();
      let overs = Math.floor(scoreResponse.data.Balls/6);
      let balls = scoreResponse.data.Balls%6;
        this.teamAScore = {
          runs: scoreResponse.data.Runs,
          wickets: scoreResponse.data.Wickets,
          overs: overs + '.' + balls
        };
    });
  }
  private getUpdatedScoreDetails(){
    this.scoreService.getRecentScoreByMatchId(this.matchId, this.battingTeamId)
    .subscribe(response => {
      let scoreResponse = response.json();
      this.detailScore = [];
      scoreResponse.data.forEach(score => {
        this.detailScore.push({
          run: score.Runs,
          wickets: score.Wickets,
          discription: score.Discription,
          batId: score.Bat_Id,
          ballerId: score.Baller_Id
        });
      });
    });
  }
  private getOtherTeamScore(){
    this.scoreService.getScoreByMatchId(this.matchId, this.teamBId)
    .subscribe(response => {
      let scoreResponse = response.json();
      let overs = Math.floor(scoreResponse.data.Balls/6);
      let balls = scoreResponse.data.Balls%6;
        this.teamBScore = {
          runs: scoreResponse.data.Runs,
          wickets: scoreResponse.data.Wickets,
          overs: overs + '.' + balls
        };
    });
  }
  private getTeamDetails(teamId: number) {
    let teamDetails : any;
    this.allTeams.forEach(team => {
      if(team.teamId === teamId){
        teamDetails = team;
      }
    });
    return teamDetails;
  }
}
