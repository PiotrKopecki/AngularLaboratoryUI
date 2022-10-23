import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../segments/login/login.component';

@Component({
  selector: 'app-nav-side-bar',
  templateUrl: './nav-side-bar.component.html',
  styleUrls: ['./nav-side-bar.component.scss']
})
export class NavSideBarComponent implements OnInit {

  constructor(private loginMechanism: LoginComponent) { }

  menuVariable:boolean = false;
  iconVariable:boolean = false;

  ngOnInit(): void {
  }

  logout(){
    this.loginMechanism.logoutWithGoogle();
  }

  openCloseMenu(){
    this.menuVariable = !this.menuVariable;
    this.iconVariable = !this.iconVariable;
  }
}
