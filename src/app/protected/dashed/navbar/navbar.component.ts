import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/auth/interfaces/auth.interface';
import { LoginService } from 'src/app/auth/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterContentChecked{
  user!:any;

  constructor(
    private router: Router,
    private loginService:LoginService
  ) { }

    ngOnInit() {
    }
    
  ngAfterContentChecked() {
    this.user = this.loginService.user;

  }

  signout(){
    this.loginService.signout();
    this.router.navigate(['./auth/logout']);
  }

}
