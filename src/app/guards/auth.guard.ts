import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authSvc: AuthService, private router: Router)
  {
    
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
   Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    if(this.authSvc.logeado)
    {
      return true;
    }
    else
    { 
      console.log("Acceso denegado");
      this.router.navigateByUrl('/Login');
      return false;
    }
  }

  
}
