import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl, FormControlName, Validators } from '@angular/forms';
import {AuthService} from '../services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  form=new FormGroup({
    username : new FormControl(''),
    email : new FormControl(''),
    password : new FormControl('')
  })

  onSubmit(form){
    console.log(form.value)
    var temp = {
      "username" : form.value.username,
      "email" : form.value.email,
      "password" : form.value.password,
    }
    
    this.authService.register(temp).subscribe((res)=>{
      console.log('register successfully',res)
    })

  }

}
