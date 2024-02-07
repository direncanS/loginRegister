import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../../interfaces';
import { LOCALSTORAGE_TOKEN_KEY } from 'src/app/app.module';
import { Router } from '@angular/router';

export const fakeLoginResponse: LoginResponse = {
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  refreshToken: {
    id: 1,
    userId: 2,
    token: 'fakeToken',
    refreshCount: 2,
    expiryDate: new Date(),
  },
  tokenType: 'JWT'
}

export const fakeRegisterResponse: RegisterResponse = {
  status: 200,
  message: 'Registration sucessfull.'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email = "test@test.at";
  password = "12345678"

  constructor(
    private snackbar: MatSnackBar,
    private router: Router
  ) { }


  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    if (loginRequest.email === this.email && loginRequest.password === this.password) {
      console.log('Giriş Başarılı.'); // web konsoluna yazıldığı kısım.
      return of(fakeLoginResponse).pipe(
        tap((res: LoginResponse) => localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, res.accessToken)),
        tap(() => this.snackbar.open('Giriş Başarılı', 'Close', {
          duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
        }))
      );
    } else {
      console.log('Giriş Başarısız.');
      localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
      this.router.navigate(['../../']); // web konsoluna yazıldığı kısım.
      return of(fakeLoginResponse).pipe(
        tap(() => this.snackbar.open('Kullanıcı adı veya şifre hatalı.', 'Close', {
          duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
        }))
      );

    }



  }

  register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return of(fakeRegisterResponse).pipe(
      tap((res: RegisterResponse) => this.snackbar.open(`Kullanıcı başarıyla oluşturuldu.`, 'Close', {
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
      })),
    );

  }


}
