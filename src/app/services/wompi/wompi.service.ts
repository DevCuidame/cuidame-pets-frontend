import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const url = environment.url;

@Injectable({
  providedIn: 'root',
})
export class WompiService {
  constructor(private http: HttpClient) {}

  getSignature(data: any): Observable<any> {
    return this.http.post<any>(`${url}api/wompi`, data);
  }
}
