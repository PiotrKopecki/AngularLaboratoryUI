import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { RouterNavigation } from 'src/app/_service/router-navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: SocialUser | null; 
  public static localStorageToken = 'GoogleUserCredential';

  constructor(private routerNavigation: RouterNavigation, private authService: SocialAuthService){
    this.authService.authState.subscribe((user: SocialUser) => {
      if(user != null){
        this.setLocalStorageAndNavigate(user.authToken);
      }
    });
   }

  ngOnInit(): void {
    if(this.isLoggedIn()){
      this.routerNavigation.openHomePage();
    }
  }

  setLocalStorageAndNavigate(token: string){
    localStorage.setItem(LoginComponent.localStorageToken, token)
    this.routerNavigation.openHomePage();
  }

  logoutWithGoogle(){
    this.authService.signOut();
    localStorage.removeItem(LoginComponent.localStorageToken);
    this.routerNavigation.openLoginPage();
  }

  isLoggedIn() : boolean{
    if(localStorage.getItem(LoginComponent.localStorageToken)?.length){
      return true;
    }
    return false;
  }
}
