import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  url = 'http://localhost:3000/team';

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
  post(teamIcon: any, name: string, country: string) {
    const formData = new FormData();
    formData.append('teamIcon', teamIcon);
    formData.append('name', name);
    formData.append('country', country);

    return this.http.post(this.url, formData);
  }
}
