import { Component } from '@angular/core';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';

import { User } from './user.model';
import { Angular2TokenService } from 'angular2-token';

@Injectable()

export class AuthService{
    public constructor(private tokenService: Angular2TokenService){ }

    public signUp(user: User){
        // call Angular2-Token SignUp method here!
        // returns Observable<Response>
    }

    public signIn(uid: string){
        // call Angular2-Token SignUp method here!
        // returns Observable<Response>
    }

    public signOut(){
        // call Angular2-Token SignOuy method here!
        // returns Observable<Response>
    }

    public inSignedIn(){
        // call Angular2-Token userSignedIn method here!
        // returns Boolean
    }

    private handleError(error) {
        console.log("SALVANDO O ERRO EM UM ARQUIVO DE LOG - DETALHES DO ERRO =>", error);
        return throwError(error);
    }
}