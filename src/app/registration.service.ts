import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http : HttpClient) { }
  registerUser(user : any) {
    return this.http.post('http://localhost:3000/add-user', user)
    .pipe(
      catchError(this.errorHandler),
      tap(res => {
        console.log(res);
      })
    );
  }
  errorHandler(error : HttpErrorResponse){
    return throwError(error);
  };
}
