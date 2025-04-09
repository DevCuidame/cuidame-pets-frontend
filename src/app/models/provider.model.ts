export class ProviderModel {
  public provider_type: string;
  public identification_type: string;
  public identification_number: string;
  public full_name: string;
  public email: string;
  public phone: string;
  public address: string;
  public city: number;
  public photo_bs64: string;
  public pub_photo: string;
  public priv_photo: string;
  public status: boolean;

  constructor(
    provider_type: string,
    identification_type: string,
    identification_number: string,
    full_name: string,
    email: string,
    phone: string,
    address: string,
    city: number,
    photo_bs64: string,
    pub_photo: string,
    priv_photo: string,
    status: boolean,
    
  ) {
    this.provider_type = provider_type;
    this.identification_type = identification_type;
    this.identification_number = identification_number;
    this.full_name = full_name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.phone = phone;
    this.photo_bs64 = photo_bs64;
    this.pub_photo = pub_photo;
    this.priv_photo = priv_photo;
    this.status = status;
  }
}
