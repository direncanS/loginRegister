import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('passwordInput')
  passwordRef!: ElementRef;
  @ViewChild('passwordEye')
  passwordEyeRef!: ElementRef;
  currentIcon: string = 'visibility';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
  });


  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    this.authService.login(this.loginForm.value).pipe(
      tap(() => this.router.navigate(['../../protected/dashboard']))
    ).subscribe();
  }
  onChangePasswordEye() {
    if (this.passwordRef.nativeElement.getAttribute('type') === 'text') {
      this.passwordRef.nativeElement.setAttribute('type', 'password');

      if (this.passwordEyeRef.nativeElement != undefined) {
        this.currentIcon = 'visibility';
      }
    } else {
      this.passwordRef.nativeElement.setAttribute('type', 'text');

      if (this.passwordEyeRef.nativeElement != undefined) {
        this.currentIcon = 'visibility_off';

      }
    }
  }



}
