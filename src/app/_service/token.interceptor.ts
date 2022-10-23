import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginComponent } from '../segments/login/login.component';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  public static BEARER = 'Bearer ';

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.skipInterceptor(request)){
      request = request.clone({
				setHeaders: {
					'access-control-allow-origin': '*'
				}
			});
      return next.handle(request);
    }
    if(localStorage.getItem(LoginComponent.localStorageToken)?.length){
      const token = TokenInterceptor.BEARER + localStorage.getItem(LoginComponent.localStorageToken);
      request = request.clone({
        setHeaders: {
          'access-control-allow-origin': '*',
          Authorization: TokenInterceptor.BEARER + localStorage.getItem(LoginComponent.localStorageToken)
        }
      });
    }
    else{
      request = request.clone({
				setHeaders: {
					'access-control-allow-origin': '*'
				}
			});
    }
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        const errorMsg = this.handleError(errorResponse);
        return throwError(() => new Error(errorMsg));
      })
    )
  }

  skipInterceptor(request: HttpRequest<any>): boolean{
    if(!request.url.startsWith('http')){
      return true;
    }
    return false;
  }

  handleError(error: HttpErrorResponse) : string{
    let errorMsg = '';
    if(error.error instanceof ErrorEvent){
      console.log('This is client side error');
      errorMsg = `Error: ${error.error.message}`;
    }else{
      console.log('This is server side error');
      errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
    }
    alert("Something went wrong..")
    return errorMsg;
  }
}
