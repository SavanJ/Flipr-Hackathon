import { Injectable } from '@angular/core';
import{ HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  readonly baseURL = 'http://localhost:3000/newTeam';
  readonly baseURL1 = 'http://localhost:3000/getTeam';
  readonly baseURL2 = 'http://localhost:3000/getTeamDetail';
  readonly baseURL3 = 'http://localhost:3000/createTeamList';
  readonly baseURL4 = 'http://localhost:3000/getTeamList';
  readonly baseURL5 = 'http://localhost:3000/insertCardIntoList';
  readonly baseURL6 = 'http://localhost:3000/addMember';

  constructor(private http: HttpClient) { } 
  
  newTeam(team) {
    return this.http.post(this.baseURL , team);
  }
  getTeam(name) {
    return this.http.post(this.baseURL1,name);
  }

  // TEAM DETAIL SERVICES

  getTeamDetail(id){
    var temp = {"teamId":id}
    return this.http.post<any>(this.baseURL2 ,temp)
  }
  createTeamList(temp){
    return this.http.post<any>(this.baseURL3,temp)
  }
  insertCardIntoList(arr){
    return this.http.post<any>(this.baseURL5,arr)
  }
  addMember(arr){
    return this.http.post<any>(this.baseURL6,arr)
  }

}
