import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService, AuthenticationService } from '../_services';
export class User {
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
}

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    error: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {}
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', [Validators.required, Validators.email]],
            password: ['', Validators.compose([
                // 1. Password Required
                Validators.required,
                // 2. Password should have one number
                this._patternValidator(/\d/, { hasNumber: true }),
                // 3. Password should have one uppercase
                this._patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                // 4. Password should have lowercase
                this._patternValidator(/[a-z]/, { hasSmallCase: true }),
                // 5. Min length of password should be 8 characters
                Validators.minLength(8)
            ])],
            confirmPassword: ['', Validators.compose([
                Validators.required
            ])]
        }, {
                // check whether our password and confirm password match
                validator: this._passwordMatchValidator
            });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    private _patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                // if control is empty return no error
                return null;
            }
            // test the value of the control against the regexp supplied
            const valid = regex.test(control.value);
            // if true, return no error (no error), else return error passed in the second parameter
            return valid ? null : error;
        };
    }
    private  _passwordMatchValidator(control: AbstractControl) {
        const password: string = control.get('password').value; // get password from our password form control
        const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
        // compare is the password math
        if (password !== confirmPassword) {
            // if they don't match, set an error in our confirmPassword form control
            control.get('confirmPassword').setErrors({ NoPasswordMatch: true });
        }
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        // tslint:disable-next-line:prefer-const
        let user: User = {firstName: '', lastName: '', userName: '', password: ''};
        user.firstName = this.registerForm.get('firstName').value;
        user.lastName = this.registerForm.get('lastName').value;
        user.password = this.registerForm.get('password').value;
        user.userName = this.registerForm.get('username').value;
        this.loading = true;
        this.userService.register(user)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login'], { queryParams: { registered: true }});
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}
