import { Component, OnInit } from '@angular/core'; 
import { AuthService } from './services/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

    username;

  constructor(private authService:AuthService, private router:Router){}

  ngOnInit(){
    this.getUsername()
  }

  getUsername(){
    this.authService.getUsername().subscribe((res) => {
      console.log('username',res)
      this.username = res
      //  this.username={"name":res}
    })
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate([''])
    // console.log('hi')
  }

}
