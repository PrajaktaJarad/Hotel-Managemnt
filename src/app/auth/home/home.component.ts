import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { users } from '../userdata';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // constructor() { }

  // ngOnInit(): void {
  // }
  loginForm: FormGroup;
  users: any;
  errorMsg: string;
  constructor(private router: Router, private appService: AppService) { }

  ngOnInit(): void {
   // this.users = users;
    this.users =this.appService.getAllUsers().subscribe(data=>this.users=data);
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });

  }


  onFormSubmit() {
    //  console.log(this.loginForm.value); --checking we are getting values of username and password
  
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    
  
    let user  = this.users.find(u=> (u.username === username && u.password === password && u.role==="Owner" ));
    let user1  = this.users.find(u=> (u.username === username && u.password === password && u.role==="Manager" ));
    let user2  = this.users.find(u=> (u.username === username && u.password === password && u.role==="Receptionist" ));
   // let user  = this.users.find(u=> (u.username === username && u.password === password && u.role=="owner"));
    
   if(user){
      
    localStorage.setItem("isLoggedIn","true");
    let token = btoa(username + ':' + password);
    localStorage.setItem("token", token);
    this.appService.loggedIn.next(true);
    this.router.navigateByUrl('/owner');
 
 }
 else if(user1){
  localStorage.setItem("isLoggedIn","true");
  let token = btoa(username + ':' + password);
  localStorage.setItem("token", token);
  this.appService.loggedIn.next(true);
  this.router.navigateByUrl('/manager');
  
 }
 else if(user2){
  localStorage.setItem("isLoggedIn","true");
  let token = btoa(username + ':' + password);
  localStorage.setItem("token", token);
  this.appService.loggedIn.next(true);
  this.router.navigateByUrl('/receptionist');
  
 }
else{
        this.errorMsg = 'Invalid Credentials';
     }

  //  if(user){
      
  //      localStorage.setItem("isLoggedIn","true");
  //      let token = btoa(username + ':' + password);
  //      localStorage.setItem("token", token);
  //      this.appService.loggedIn.next(true);
  //      this.router.navigateByUrl('/owner');
    
  //   }else{
  //      this.errorMsg = 'Invalid Credentials';
  //   }
  }
}

