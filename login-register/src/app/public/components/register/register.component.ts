import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ElementRef, ViewChild  } from '@angular/core';
import { CustomValidators } from '../../custom-validator';
import { AuthService } from '../../services/auth-service/auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('passwordInput')
  passwordRef!: ElementRef;

  @ViewChild('passwordEye') 
  passwordEyeRef!: ElementRef;

  @ViewChild('matchPassword') 
  matchPasswordRef!: ElementRef;

  @ViewChild('matchPasswordEye') 
  matchPasswordEyeRef!: ElementRef;

  passwordIcon: string = 'visibility';
  passwordMatchIcon: string = 'visibility';

  registerForm = new FormGroup({
    company: new FormControl(null, [Validators.required]),
    adress: new FormControl(null),
    street: new FormControl(null),
    city: new FormControl(null),
    postCode: new FormControl(null),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    passwordConfirm: new FormControl(null, [Validators.required, Validators.minLength(8)])
  },
    { validators: CustomValidators.passwordsMatching }
  )

  get company() { return this.registerForm.get('company'); }
  get adress() { return this.registerForm.get('adress'); }
  get street() { return this.registerForm.get('street'); }
  get city() { return this.registerForm.get('city'); }
  get postCode() { return this.registerForm.get('postCode'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get passwordConfirm() { return this.registerForm.get('passwordConfirm'); }


  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.company?.setValue("FH Technikum Wien");
    this.company?.disable();
   }

  register() {
    if (!this.registerForm.valid) {
      return;
    }
    this.authService.register(this.registerForm.value).pipe(
      tap(() => this.router.navigate(['../login']))
    ).subscribe();
  }

  onChangePasswordEye() {
    if (this.passwordRef.nativeElement.getAttribute('type') === 'text') {
      this.passwordRef.nativeElement.setAttribute('type', 'password');

      if (this.passwordEyeRef.nativeElement != undefined) {
        this.passwordIcon = 'visibility';
      }
    } else {
      this.passwordRef.nativeElement.setAttribute('type', 'text');
      
      if (this.passwordEyeRef.nativeElement != undefined) {
        this.passwordIcon = 'visibility_off';
      }
    }
  }

  onChangeMatchPasswordEye() {
    if (this.matchPasswordRef.nativeElement.getAttribute('type') === 'text') {
      this.matchPasswordRef.nativeElement.setAttribute('type', 'password');

      if (this.matchPasswordEyeRef.nativeElement != undefined) {
        this.passwordMatchIcon = 'visibility';
      }
    } else {
      this.matchPasswordRef.nativeElement.setAttribute('type', 'text');

      if (this.matchPasswordEyeRef.nativeElement != undefined) {
        this.passwordMatchIcon = 'visibility_off';
      }
    }
  }

}
