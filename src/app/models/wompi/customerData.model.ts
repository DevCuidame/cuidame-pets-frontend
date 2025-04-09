class CustomerData {
  email: string;
  fullName: string;
  phoneNumber: string;
  phoneNumberPrefix: string;
  legalId: string;
  legalIdType: string;

  constructor(
    email: string,
    fullName: string,
    phoneNumber: string,
    phoneNumberPrefix: string,
    legalId: string,
    legalIdType: string
  ) {
    this.email = email;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.phoneNumberPrefix = phoneNumberPrefix;
    this.legalId = legalId;
    this.legalIdType = legalIdType;
  }
}
