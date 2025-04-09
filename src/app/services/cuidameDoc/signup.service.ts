import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, of } from 'rxjs';
import { NgForm } from '@angular/forms';
const url = environment.url;
@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return of(error.error);
  }

  createUserFromDoc(info) {
    return this.http
      .post(`${url}api/users/signup`, info, {
        headers: {
          'Content-type': 'application/json',
        },
      })
      .pipe(catchError(this.handleError));
  }

  login(fLogin: NgForm) {
    return this.http
      .post(
        `${url}api/users/loginuser`,
        { ...fLogin.form.value },
        {
          headers: {
            'Content-type': 'application/json',
          },
        }
      )
      .pipe(catchError(this.handleError));
  }

  resendEmail(email) {
    return this.http
      .post(`${url}api/users/resend-email`, {email})
      .pipe(catchError(this.handleError));
  }
}
