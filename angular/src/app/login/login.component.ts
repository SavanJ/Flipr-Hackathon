import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl, FormControlName, Validators } from '@angular/forms';
import {AuthService} from '../services/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
  }

  form=new FormGroup({
    username : new FormControl(''),
    password : new FormControl('')
  })

  onSubmit(form){
    var temp = {
      "username" : form.value.username,
      "password" : form.value.password
    }
    console.log(temp)
    this.authService.login(temp).subscribe((res)=>{
      console.log('logged succesfully',res,res.token)
      localStorage.setItem('token',res.token);
      this.router.navigate(['/dashboard'])
    })
  }

}
