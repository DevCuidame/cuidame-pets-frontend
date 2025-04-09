export class ProviderServiceModel {
  public provider_id: number;
  public service_id: number;
  public status: boolean;
  constructor(provider_id: number, service_id: number, status: boolean) {
    this.provider_id = provider_id;
    this.service_id = service_id;
    this.status = status;
  }
}
