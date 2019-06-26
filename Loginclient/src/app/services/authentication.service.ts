import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
 
@Injectable()
export class AuthenticationService implements CanActivate{
    constructor(private router: Router){
    }
    canActivate(){
        if (!localStorage.getItem('loginWebApp.token')) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}