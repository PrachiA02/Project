import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class TeamPlayerMappingService {
  
  url = 'http://localhost:3000/teamPlayerMapping';

  constructor(private http: Http) { }

  post(teamId: number, players: any[]) {
    return this.http.post(this.url + '/' + teamId, players);
  }

  get(teamId: number) {
    return this.http.get(this.url + '/' + teamId);
  }

  delete(teamId: number) {
    return this.http.delete(this.url + '/' + teamId);
  }
}
