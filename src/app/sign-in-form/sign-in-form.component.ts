import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';
import { FormUtils } from '../shared/form.utils';

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in-form.component.html'
})

export class SignInFormComponent{
    public form: FormGroup;
    public formUtils: FormUtils;
    public submitted = false;
    public formErrors = null;

    public constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router){
        this.setupForm();
        this.formUtils = new FormUtils(this.form);
        this.submitted = false;
        this.formErrors = null;
    }

    public signInUser(){
        this.submitted = true;

        this.authService.signIn(this.form.get('login').value, this.form.get('password').value)
            .subscribe(
                // Sucesso
                () => {
                    this.router.navigate(['/dashboard']);
                    this.formErrors = null;
                },
                // Error
                (error) => {
                    this.submitted = false;

                    if (error.status === 401) {
                        // Captura mensagem de erro visível no console do browser
                        this.formErrors = error.error.errors;
                    }else {
                        this.formErrors = ["Não foi possível processar sua solicitação. Por favor, tente mais tarde."];
                    }
                }
            );
    }

    private setupForm(){
        this.form = this.formBuilder.group({
            login: [null, [Validators.required, Validators.email]],
            password: [null, Validators.required],
        });
    }
}