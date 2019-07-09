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
            );
    }

    public signIn(uid: string, password: string): Observable<Response> {
        // call Angular-Token SignUp method here!
        // returns Observable<Response>
        let signInData = {
            login: uid,
            password: password
        };

        return this.tokenService.signIn(signInData)
            .pipe(
                catchError(this.handleError)
            );
    }

    public signOut(): Observable<Response> {
        // call Angular-Token SignOuy method here!
        // returns Observable<Response>
        return this.tokenService.signOut()
            .pipe(
                catchError(this.handleError)
            );
    }

    public userSignedIn() {
        // call Angular-Token userSignedIn method here!
        // returns Boolean

        return this.tokenService.userSignedIn();
    }

    private handleError(error) {
        console.log("ERRO DE AUTENTICAÇÃO - DETALHES DO ERRO =>", error);
        return throwError(error);
    }
}