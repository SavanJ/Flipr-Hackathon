declare var $: any;
declare const addItem:any;
declare const newList:any;
declare const closeList:any;
declare const addTeamBox:any;


import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl, FormControlName, Validators } from '@angular/forms';
import { TeamService } from '../services/team.service'
import {AuthService} from '../services/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teams;
  username;
  id;
  constructor(private teamService:TeamService,private authService:AuthService,
    private router:Router) { }

  form=new FormGroup({
    cardName : new FormControl('')
  })
  form1=new FormGroup({
    newTeam : new FormControl('')
  })
  form2=new FormGroup({
    member : new FormControl('')
  })

  ngOnInit() {
    this.getUsername()
  }

  getUsername(){
    this.authService.getUsername().subscribe((res) => {
      console.log('username',res)
       this.username={"name":res}
      this.getTeamList(this.username)
    })
  }

  getTeamList(name){
    this.teamService.getTeam(name).subscribe((res) =>{
      this.teams = res[0].team
      this.id = res[0]._id
      console.log(res[0].team,this.id)
    })
  }

  addCard(id){
    addItem(id)
    console.log(id)
  }

  newList(){
    newList()
  }
  createNewList(form1){
    console.log(form1.value.newTeam)
    // var temp = {"newCardName" : form1.value.newCard}
    var temp = {"teamName" : form1.value.newTeam,"name":this.username}
    this.teamService.newTeam(temp).subscribe((res) =>{
      console.log(res)
      this.getTeamList(this.username)
    })
    form1.reset()
    closeList()
  }

  addTeamMember(teamid){
    addTeamBox(teamid)
    // console.log(teamid)
  }
  onTeamSubmit(name,teamid,form){
    // console.log(form.value.member)
    var string
    var emails = form.value.member
    var temp = new Array();
    temp = emails.split(",");
    var arr={"member":temp,"teamName":name,"teamId":teamid}
    // console.log(arr)
    this.teamService.addMember(arr).subscribe((res)=>{
      console.log('successfully member created')
    })
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate([''])
    // console.log('hi')
  }
}
