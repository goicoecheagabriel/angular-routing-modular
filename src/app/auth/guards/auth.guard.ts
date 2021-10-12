import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginService } from '../services/login.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(
    private loginService: LoginService,
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      // if(this.loginService.user.id){
      //   return true;
      // }
      
      // return false;
      return this.loginService.verificaAutenticacion();
    }
    canLoad(): Observable<boolean> | Promise<boolean> | boolean {
  
        return this.loginService.verificaAutenticacion();
  
      
    //   if(this.loginService.user.id){
    //     return true;
    //   }

    // return false;
  }
}
