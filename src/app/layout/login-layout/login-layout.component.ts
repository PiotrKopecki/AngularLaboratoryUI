import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-layout',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `
})
export class LoginLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
