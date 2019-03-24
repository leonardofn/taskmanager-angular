import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { AngularTokenService, RegisterData } from 'angular-token';

import { User } from './user.model';

@Injectable()

export class AuthService{
    public constructor(private tokenService: AngularTokenService){ }

    public signUp(user: User): Observable<Response> {
        // call Angular-Token SignUp method here!
        // returns Observable<Response>
        return this.tokenService.registerAccount(user as any)
            .pipe(
                catchError(this.handleError)
            )
    }

    public signIn(uid: string, password: string){
        // call Angular-Token SignUp method here!
        // returns Observable<Response>
    }

    public signOut(): Observable<Response> {
        // call Angular-Token SignOuy method here!
        // returns Observable<Response>
        return this.tokenService.signOut()
            .pipe(
                catchError(this.handleError)
            )
    }

    public userSignedIn() {
        // call Angular-Token userSignedIn method here!
        // returns Boolean

        return this.tokenService.userSignedIn();
    }

    private handleError(error) {
        console.log("SALVANDO O ERRO EM UM ARQUIVO DE LOG - DETALHES DO ERRO =>", error);
        return throwError(error);
    }
}