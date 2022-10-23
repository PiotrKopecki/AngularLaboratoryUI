import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../segments/login/login.component';
@Component({
  selector: 'app-header',
  template: `
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <div class="header">
      <div id="Text">Spring Laboratory Application</div>
      <mat-icon id="logoutButton" (click)="logout()" *ngIf="isLoggedIn()" color="accent">logout</mat-icon>
    </div>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private loginMechanism: LoginComponent) { }

  ngOnInit(): void {
  }

  logout(){
    this.loginMechanism.logoutWithGoogle();
  }

  isLoggedIn() : boolean{
    return this.loginMechanism.isLoggedIn();
  }
}