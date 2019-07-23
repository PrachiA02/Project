import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable(    )
export class UserService implements CanActivate {

  url = 'http://localhost:3000/user';

  constructor(
    private router: Router,
    private http: Http) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // check if user has logged in
    if (sessionStorage['loginStatus'] == '1') {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  isUserLogin() {
    if (sessionStorage['loginStatus'] == '1') {
      return true;
    }
    return false;
  }

  signup(firstName: string, lastName: string, email: string, password: string) {
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };

    const headers = new Headers({'Content-Type': 'application/json'});
    const requestOptions = new RequestOptions({headers: headers});

    return this.http.post(this.url + '/register', body, requestOptions);
  }
  logout() {
    sessionStorage.setItem('loginStatus', '0');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
  login(email: string, password: string) {
    const body = {
      email: email,
      password: password
    };

    const headers = new Headers({'Content-Type': 'application/json'});
    const requestOptions = new RequestOptions({headers: headers});

    this.http.post(this.url + '/login', body, requestOptions)
    .subscribe(response => {
      let userResponse = response.json();
      if (userResponse['status'] == 'success') {
        let userId = userResponse.data.User_Id;
        let userName = userResponse.data.First_Name + ' ' + userResponse.data.Last_Name;
        sessionStorage.setItem('loginStatus', '1');
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', userName);
        alert("Welcome " +userName);
        this.router.navigate(['/home']);
      } else {
        alert('Invalid Credential');
      }
    });
  }

}