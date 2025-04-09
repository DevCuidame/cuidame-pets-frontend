import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WompiService } from 'src/app/services/wompi/wompi.service';

@Component({
    selector: 'app-wompi-payment',
    templateUrl: './wompi-payment.component.html',
    styleUrls: ['./wompi-payment.component.scss'],
    standalone: false
})
export class WompiPaymentComponent {
  paymentForm: FormGroup;
  signature: string = '';

  constructor(private wompiService: WompiService, private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      reference: ['', Validators.required],
      amount: ['', Validators.required],
      currency: ['COP', Validators.required],
      redirectUrl: ['https://transaction-redirect.wompi.co/check', Validators.required],
      expirationTime: ['', Validators.required],
      taxInCents: this.fb.group({
        consumption: ['', Validators.required],
        vat: ['', Validators.required]
      }),
      customerData: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        fullName: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        phoneNumberPrefix: ['+57', Validators.required],
        legalId: ['', Validators.required],
        legalIdType: ['CC', Validators.required]
      }),
      shippingAddress: this.fb.group({
        addressLine1: ['', Validators.required],
        addressLine2: [''],
        country: ['CO', Validators.required],
        city: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        region: ['', Validators.required],
        name: ['', Validators.required]
      })
    });
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      const signatureData = {
        reference: this.paymentForm.value.reference,
        amount: this.paymentForm.value.amount,
        currency: this.paymentForm.value.currency,
        expirationDate: this.paymentForm.value.expirationTime
      };

      this.wompiService.getSignature(signatureData).subscribe(
        (response) => {
          this.signature = response.integrity;
          this.submitForm();
        },
        (error) => {
          console.error('Error generating signature:', error);
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }

  private submitForm(): void {
    const form = document.createElement('form');
    form.action = 'https://checkout.wompi.co/p/';
    form.method = 'GET';

    form.appendChild(this.createHiddenInput('public-key', 'pub_test_cI8wkLBO42suNLMwlXnvPW10RMMpQvVM'));
    form.appendChild(this.createHiddenInput('currency', this.paymentForm.value.currency));
    form.appendChild(this.createHiddenInput('amount-in-cents', this.paymentForm.value.amount));
    form.appendChild(this.createHiddenInput('reference', this.paymentForm.value.reference));
    form.appendChild(this.createHiddenInput('signature:integrity', this.signature));
    form.appendChild(this.createHiddenInput('redirect-url', this.paymentForm.value.redirectUrl));
    form.appendChild(this.createHiddenInput('expiration-time', this.paymentForm.value.expirationTime));
    form.appendChild(this.createHiddenInput('tax-in-cents:vat', this.paymentForm.value.taxInCents.vat));
    form.appendChild(this.createHiddenInput('tax-in-cents:consumption', this.paymentForm.value.taxInCents.consumption));
    form.appendChild(this.createHiddenInput('customer-data:email', this.paymentForm.value.customerData.email));
    form.appendChild(this.createHiddenInput('customer-data:full-name', this.paymentForm.value.customerData.fullName));
    form.appendChild(this.createHiddenInput('customer-data:phone-number', this.paymentForm.value.customerData.phoneNumber));
    form.appendChild(this.createHiddenInput('customer-data:legal-id', this.paymentForm.value.customerData.legalId));
    form.appendChild(this.createHiddenInput('customer-data:legal-id-type', this.paymentForm.value.customerData.legalIdType));
    form.appendChild(this.createHiddenInput('shipping-address:address-line-1', this.paymentForm.value.shippingAddress.addressLine1));
    form.appendChild(this.createHiddenInput('shipping-address:country', this.paymentForm.value.shippingAddress.country));
    form.appendChild(this.createHiddenInput('shipping-address:phone-number', this.paymentForm.value.shippingAddress.phoneNumber));
    form.appendChild(this.createHiddenInput('shipping-address:city', this.paymentForm.value.shippingAddress.city));
    form.appendChild(this.createHiddenInput('shipping-address:region', this.paymentForm.value.shippingAddress.region));

    document.body.appendChild(form);
    form.submit();
  }

  private createHiddenInput(name: string, value: string): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    return input;
  }
}
