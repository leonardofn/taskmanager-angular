import { Injectable } from '@angular/core';

import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';

@Injectable()

export class AuthGuard implements CanActivate{

    public constructor(private authService: AuthService, private router: Router){ }

    // verifica se o usuário pode ou não ativar uma determinda rota
    public canActivate(){
        if (this.authService.userSignedIn()){
            return true;
        }else{
            this.router.navigate(['/sign-in']);
            return false;
        }
    }
}