import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  url = 'http://localhost:3000/score';

  constructor(private http: Http) { }

  get() {
    return this.http.get(this.url);
  }
  getScoreByMatchId(matchId: number, battingTeamId: number) {
    return this.http.get(this.url + '/' + matchId + '/' + battingTeamId);
  }
  getRecentScoreByMatchId(matchId: number, battingTeamId: number) {
    return this.http.get(this.url + '/match/' + matchId + '/' + battingTeamId);
  }
  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
  post(matchId: number, overs: number, balls: number, runs: number,
    batId: number, ballerId: number, wickets: number, battingTeam: number, discription: string) {
    let score = {
      matchId: matchId,
      overs: overs,
      balls: balls,
      runs: runs,
      batId: batId,
      ballerId: ballerId,
      wickets: wickets,
      battingTeam: battingTeam,
      discription: discription
    };
    return this.http.post(this.url, score);
  }
}
