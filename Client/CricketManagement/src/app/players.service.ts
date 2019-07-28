import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  url = 'http://localhost:3000/player';

  constructor(private http: Http) { }

  get() {
    return this.http.get(this.url);
  }
  getDetails(id: number) {
    return this.http.get(this.url + '/' + id);
  }
  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
  post(playerPhoto: any, name: string, birthDate: string, age: number,
    majorTeams: string, playingRole: string, batingStyle: string,
    bowlingStyle: string, nativePlace: string, description: string) {
    const formData = new FormData();
    formData.append('playerPhoto', playerPhoto);
    formData.append('name', name);
    formData.append('age', '' + age);
    formData.append('playingRole', playingRole);
    formData.append('majorTeams', majorTeams);
    formData.append('bowlingStyle', bowlingStyle);
    formData.append('batingStyle', batingStyle);
    formData.append('description', description);
    formData.append('birthDate', birthDate);
    formData.append('nativePlace', nativePlace);
    return this.http.post(this.url, formData);
  }
}