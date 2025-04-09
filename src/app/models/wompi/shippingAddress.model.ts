class ShippingAddress {
  addressLine1: string;
  addressLine2: string;
  country: string;
  city: string;
  phoneNumber: string;
  region: string;

  constructor(
    addressLine1: string,
    addressLine2: string,
    country: string,
    city: string,
    phoneNumber: string,
    region: string,
  ) {
    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;
    this.country = country;
    this.city = city;
    this.phoneNumber = phoneNumber;
    this.region = region;
  }
}
