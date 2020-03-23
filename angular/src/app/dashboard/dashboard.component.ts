declare var $: any;
declare const addItem:any;
declare const addItem1:any;
declare const newList:any;
declare const closeList:any;

import { Component, OnInit } from '@angular/core'; 
import { FormGroup , FormControl, FormControlName, Validators } from '@angular/forms';
import { DataService } from '../services/data.service'
import {AuthService} from '../services/auth.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  lists = [];
  username;
  // arr=[]
  constructor(private dataService:DataService , private authService:AuthService,
    private router:Router){}

  title = 'hackathon';
  list1 = ['swimming','dancing','123']
  list2 = ['abc','def','ghi']

  form=new FormGroup({
    cardName : new FormControl('')
  })
  form1=new FormGroup({
    newCard : new FormControl('')
  })

  ngOnInit(){
    this.getUsername()
  } 

  getUsername(){
    this.authService.getUsername().subscribe((res) => {
      console.log('username',res)
       this.username={"name":res}
      this.getLists(this.username)
    })
  }

  getLists(name){
    this.dataService.getAll(name).subscribe((res) => {
      console.log('getLists',res[0].cards);
      this.lists = res[0].lists
      })
    // console.log(name)
  }
  
  addCard1(id){
    addItem(id)
    console.log(id)
  }
  onSubmit(id,form)
  {
    console.log(id , form.value.cardName)
    addItem1(id,form.value.cardName)
    var arr = {"id" : id,"value":form.value.cardName,"name":this.username}
    console.log(arr)
    form.reset()
    this.dataService.insert(arr).subscribe((res) => {
      console.log('inserted successfully',res);
      this.getLists(this.username)
    })
    
    
  }
  newList(){
    newList()
  }
  createNewList(form1){
    console.log(form1.value.newCard)
    var temp = {"newCardName" : form1.value.newCard,"name":this.username}
    form1.reset()
    this.dataService.create(temp)
    .subscribe((res) => {
      // console.log('new list created successfully',res);
      this.getLists(this.username)
    })
    closeList()
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate([''])
    // console.log('hi')
  }
}

