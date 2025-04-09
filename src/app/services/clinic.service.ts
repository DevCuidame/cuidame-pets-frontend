import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
const url = environment.url;
const api = environment.mapsKey;

@Injectable({
  providedIn: 'root',
})
export class ClinicService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return of(error.error);
  }

  getByService(service: string) {
    return this.http
      .get(`${url}api/clinics/${service}`, )
      .pipe(catchError(this.handleError));
  }

  getAllClinics() {
    return this.http
      .get(`${url}api/clinics/`)
      .pipe(catchError(this.handleError));
  }

  geocodeAddress(address: string): Observable<any> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${api}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        if (response && response.results && response.results.length > 0) {
          return response.results[0].geometry.location;
        } else {
          throw new Error('No se encontraron resultados para la dirección proporcionada.');
        }
      })
    );
  }

  async setButtons(data: string) {
    localStorage.setItem('service', data);
  }
  
  getButtons(): string | null {
    const data = localStorage.getItem('service');
    if (data) {
      return data;
    }
    return null;
  }

}
