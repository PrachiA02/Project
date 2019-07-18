import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  url = 'http://localhost:3000/match';

  constructor(private http: Http) { }

  post(matchName: string, team1: number,team2: number, matchType : string, 
    stadium: string, location : string, matchStatus: string,date : string) {
      let match = {
        team1: team1,
        team2: team2,
        stadium: stadium,
        location: location,
        matchType: matchType,
        matchName: matchName,
        date: date,
        matchStatus: matchStatus
      };
      return this.http.post(this.url, match);
    }
}
