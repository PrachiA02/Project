import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  url = 'http://localhost:3000/match';

  constructor(private http: Http) { }

  post(matchName: string, team1: number, team2: number, matchType: string,
    stadium: string, location: string, battingTeam: number) {
    let match = {
      team1: team1,
      team2: team2,
      stadium: stadium,
      location: location,
      matchType: matchType,
      matchName: matchName,
      battingTeam: battingTeam,
      matchStatus: 'LIVE'
    };
    return this.http.post(this.url, match);
  }
  changeInning(matchId: number, battingTeam: number) {
    let match = {
      matchId: matchId,
      battingTeam: battingTeam
    };
    return this.http.put(this.url + '/inning/', match);
  }

  changeStatus(matchId: number, winningTeam: number) {
    let match = {
      matchId: matchId,
      winningTeam: winningTeam
    };
    return this.http.put(this.url + '/status/', match);
  }

  get() {
    return this.http.get(this.url);
  }

  getDetails(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  getMatchesByStatus(status: String) {
    return this.http.get(this.url + '/status/' + status);
  }
}


