import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { ProviderModel } from 'src/app/models/provider.model';
import { ProviderServiceModel } from 'src/app/models/service.model';
import { DocumentModel } from 'src/app/models/document.model';
import { EstablishmentModel } from 'src/app/models/establishment.model';
import { LegalRepresentModel } from 'src/app/models/legalRep.model';
const url = environment.url;

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return of(error.error);
  }

  public addProvider(obj: ProviderModel): Observable<ProviderModel> {
    return this.http.post<ProviderModel>(`${url}api/provider`, obj);
  }
  public addDocuments(obj: DocumentModel[]): Observable<DocumentModel> {
    return this.http.post<DocumentModel>(`${url}api/document`, obj);
  }
  public addServices(obj: ProviderServiceModel[]): Observable<ProviderServiceModel> {
    return this.http.post<ProviderServiceModel>(`${url}api/service`, obj);
  }

  public addEstablishment(obj: EstablishmentModel): Observable<EstablishmentModel> {
    return this.http.post<EstablishmentModel>(`${url}api/establishment`, obj);
  }

  public addLegalRep(obj: LegalRepresentModel): Observable<LegalRepresentModel> {
    return this.http.post<LegalRepresentModel>(`${url}api/legalrep`, obj);
  }

  public getAllServices(): Observable<any> {
    return this.http.get<any>(`${url}api/service`);
  }

}
