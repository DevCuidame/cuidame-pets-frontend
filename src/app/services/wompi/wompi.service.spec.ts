import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { WompiService } from 'src/app/services/wompi/wompi.service';
import { environment } from 'src/environments/environment';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
const url = environment.url;

describe('WompiService', () => {
  let service: WompiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [WompiService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(WompiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve signature from the API via POST', () => {
    const dummySignature = { integrity: 'dummy-signature' };
    const requestData = {
      reference: '37DNKF84S92N1S',
      amount: '7890000',
      currency: 'COP',
      expirationDate: '2023-06-09T20:28:50.000Z'
    };

    service.getSignature(requestData).subscribe(signature => {
      expect(signature.integrity).toBe('dummy-signature');
    });

    const req = httpMock.expectOne(`${url}api/wompi`);
    expect(req.request.method).toBe('POST');
    req.flush(dummySignature);
  });
});
