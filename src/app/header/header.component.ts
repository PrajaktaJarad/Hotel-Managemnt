import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string;
  loggedIn: boolean;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    
    this.appService.loggedIn.subscribe(data => {

      let status = localStorage.getItem('isLoggedIn');
      if (status) {
        this.loggedIn = true;
        let token = localStorage.getItem('token');
        token = atob(token);
        this.username = token.split(":")[0];
      }
      else {
        this.loggedIn = false;
      }
    });
  }

  onLogOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    this.loggedIn = false;
  }

}
