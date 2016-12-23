import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  public token: string;

  constructor(private http: Http) {}

  login(userid: string, password: string): Observable<boolean> {
    return this.http
              .post('/auth/login', JSON.stringify({userid: userid, password: password}))
              .map((response: Response) => {
                let token = response.json() && response.json().token;
                console.log(token);
                if (token) {
                  this.token = token;
                  localStorage.setItem('currentUser', JSON.stringify({ userid: userid, token: token }));
                  return true;
                } else {
                  return false;
                }
              });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }

}