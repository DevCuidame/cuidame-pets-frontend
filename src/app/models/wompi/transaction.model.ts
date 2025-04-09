class TransactionData {
  reference: string;
  amount: number;
  currency: string;
  signature: Signature;
  redirectUrl: string;
  expirationTime: Date;
  taxInCents: Tax;
  customerData: CustomerData;
  shippingAddress: ShippingAddress;

  constructor(
    reference: string,
    amount: number,
    currency: string,
    signature: Signature,
    redirectUrl: string,
    expirationTime: Date,
    taxInCents: Tax,
    customerData: CustomerData,
    shippingAddress: ShippingAddress
  ) {
    this.reference = reference;
    this.amount = amount;
    this.currency = currency;
    this.signature = signature;
    this.redirectUrl = redirectUrl;
    this.expirationTime = expirationTime;
    this.taxInCents = taxInCents;
    this.customerData = customerData;
    this.shippingAddress = shippingAddress;
  }
}
