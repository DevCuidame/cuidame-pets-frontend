import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { WompiPaymentComponent } from './wompi-payment.component';
import { of } from 'rxjs';
import { WompiService } from 'src/app/services/wompi/wompi.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('WompiPaymentComponent', () => {
  let component: WompiPaymentComponent;
  let fixture: ComponentFixture<WompiPaymentComponent>;
  let wompiService: WompiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [WompiPaymentComponent],
    imports: [ReactiveFormsModule],
    providers: [WompiService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WompiPaymentComponent);
    component = fixture.componentInstance;
    wompiService = TestBed.inject(WompiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with the correct controls', () => {
    const formControls = component.paymentForm.controls;
    expect(formControls.reference).toBeTruthy();
    expect(formControls.amount).toBeTruthy();
    expect(formControls.currency).toBeTruthy();
    expect(formControls.redirectUrl).toBeTruthy();
    expect(formControls.expirationTime).toBeTruthy();
    expect(formControls.taxInCents).toBeTruthy();
    expect(formControls.customerData).toBeTruthy();
    expect(formControls.shippingAddress).toBeTruthy();
  });

  it('should call the service to get the signature on form submission', () => {
    const dummySignature = { integrity: 'dummy-signature' };
    spyOn(wompiService, 'getSignature').and.returnValue(of(dummySignature));

    component.paymentForm.setValue({
      reference: '37DNKF84S92N1S',
      amount: '7890000',
      currency: 'COP',
      redirectUrl: 'https://transaction-redirect.wompi.co/check',
      expirationTime: '2023-06-09T20:28:50.000Z',
      taxInCents: { consumption: '590000', vat: '1290000' },
      customerData: {
        email: 'lola@perez.com',
        fullName: 'Lola Perez',
        phoneNumber: '3019777777',
        phoneNumberPrefix: '+57',
        legalId: '123456789',
        legalIdType: 'CC'
      },
      shippingAddress: {
        addressLine1: 'Carrera 123 # 4-5',
        addressLine2: 'apto 123',
        country: 'CO',
        city: 'Bogota',
        phoneNumber: '3019988888',
        region: 'Cundinamarca',
        name: 'Pedro Perez'
      }
    });

    component.onSubmit();
    expect(wompiService.getSignature).toHaveBeenCalled();
  });
});
