import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly baseURL = 'http://localhost:3000/getLists';
  readonly baseURL1 = 'http://localhost:3000/insert';
  readonly baseURL2 = 'http://localhost:3000/create';

  arr=[];
  constructor(private http: HttpClient) { } 
  
  getAll(name) {
    return this.http.post<any>(this.baseURL,name);
  }
  insert(arr) {
    return this.http.put<any>(this.baseURL1 ,arr);
  }
  create(name) {
    // console.log(name)
    return this.http.post(this.baseURL2,name);
  }



}
