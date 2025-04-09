import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
const url = environment.url;
@Injectable({
  providedIn: 'root',
})
export class PresentationService {
  private doctorSubject = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return of(error.error);
  }

  getDoctorInfo() {
    return this.http
      .get(`${url}api/doctor/7`)
      .pipe(catchError(this.handleError));
  }

  setDoctorData(doctor: any): void {
    this.doctorSubject.next(doctor);
  }

  getDoctorData(): Observable<any> {
    return this.doctorSubject.asObservable();
  }

}
