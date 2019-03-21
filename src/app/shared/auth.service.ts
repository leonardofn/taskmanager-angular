import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { AngularTokenService } from 'angular-token';

import { User } from './user.model';

@Injectable()

export class AuthService{
    public constructor(private tokenService: AngularTokenService){ }

    public signUp(user: User){
        // call Angular-Token SignUp method here!
        // returns Observable<Response>
    }

    public signIn(uid: string, password: string){
        // call Angular-Token SignUp method here!
        // returns Observable<Response>
    }

    public signOut(){
        // call Angular-Token SignOuy method here!
        // returns Observable<Response>
    }

    public inSignedIn(){
        // call Angular-Token userSignedIn method here!
        // returns Boolean
    }

    private handleError(error) {
        console.log("SALVANDO O ERRO EM UM ARQUIVO DE LOG - DETALHES DO ERRO =>", error);
        return throwError(error);
    }
}