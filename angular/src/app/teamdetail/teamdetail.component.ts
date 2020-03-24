declare var $: any;
declare const addItem:any;
declare const addItem1:any;
declare const newList:any;
declare const closeList:any;

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TeamService} from '../services/team.service'
import { FormGroup , FormControl, FormControlName, Validators } from '@angular/forms';
import {AuthService} from '../services/auth.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-teamdetail',
  templateUrl: './teamdetail.component.html',
  styleUrls: ['./teamdetail.component.css']
})
export class TeamdetailComponent implements OnInit {
  parameter;
  teamLists;
  members;
  username;

  constructor(private route:ActivatedRoute,private teamService:TeamService,
    private authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.getParam()
    this.newList()
  }

  form=new FormGroup({
    cardName : new FormControl('')
  })
  form1=new FormGroup({
    newCard : new FormControl('')
  })

  getParam(){
     this.parameter = this.route.snapshot.paramMap.get("id")   
     this.getTeamDetails(this.parameter)
  }

  getTeamDetails(id){
    this.teamService.getTeamDetail(id).subscribe((res)=>{
      this.username = res[0].teamName
      this.teamLists = res[0].lists
      this.members = res[0].members
      // console.log(res[0].lists,this.username,res[0].teamName)
    })
    // console.log(id)
  }


  addCard1(id){
    addItem(id)
    console.log(id)
  }
  onSubmit(id,form)
  {
    console.log(id , form.value.cardName)
    // addItem1(id,form.value.cardName)
    var arr = {"id" : id,"value":form.value.cardName}
    console.log(arr)
    form.reset()
    this.teamService.insertCardIntoList(arr).subscribe((res) => {
      console.log('inserted successfully',res);
      this.getTeamDetails(this.parameter)
    })
    
    
  }
  newList(){
    newList()
  }
  createNewList(form1){
    console.log(form1.value.newCard)
    var temp = {"newTeamCardName" : form1.value.newCard , "teamName":this.username}
    form1.reset()
    this.teamService.createTeamList(temp).subscribe((res) => {
      // console.log('new list created successfully',res);
      this.getTeamDetails(this.parameter)
      console.log(res)
    })
    closeList()
  }

  // getTeamLists(){
  //   this.teamService.createTeamList(temp).subscribe((res) => {
  //     this.getTeamLists()
  //   })
  // }
}
