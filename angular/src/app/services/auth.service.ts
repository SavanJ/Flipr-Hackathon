import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {user} from '../username.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  username:user

  readonly baseURL = 'http://localhost:3000/register';
  readonly baseURL1 = 'http://localhost:3000/login';
  readonly baseURL2 = 'http://localhost:3000/getUsername';

  constructor(private http:HttpClient) { }

  register(form) {
    return this.http.post<any>(this.baseURL,form);
  }

  login(form){
    return this.http.post<any>(this.baseURL1,form);
  }

  loggedIn(){
    return localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token');
  }
  getUsername(){
    console.log(this.username)
    return this.http.get<any>(this.baseURL2);
  }
}
