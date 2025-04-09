export class EstablishmentModel {
  public provider_id: number;
  public own: boolean;
  public full_name: string;

  constructor(provider_id: number, own: boolean, full_name: string) {
    this.provider_id = provider_id;
    this.own = own;
    this.full_name = full_name;
  }
}
