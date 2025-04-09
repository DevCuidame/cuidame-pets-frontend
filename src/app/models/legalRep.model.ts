export class LegalRepresentModel {
  public provider_id: number;
  public identification_type: string;
  public identification_number: string;
  public full_name: string;
  public email: string;

  constructor(
    provider_id: number,
    identification_type: string,
    identification_number: string,
    full_name: string,
    email: string
  ) {
    this.provider_id = provider_id;
    this.identification_type = identification_type;
    this.identification_number = identification_number;
    this.full_name = full_name;
    this.email = email;
  }
}
