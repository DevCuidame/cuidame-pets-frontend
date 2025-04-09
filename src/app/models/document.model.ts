export class DocumentModel {
  id?: number;
  provider_id: number;
  pub_name: string;
  priv_name: string;
  file_bs64: string;
  name: string;

  constructor(
    provider_id: number,
    pub_name: string,
    priv_name: string,
    file_bs64: string,
    name?: string
  ) {
    this.provider_id = provider_id;
    this.pub_name = pub_name;
    this.priv_name = priv_name;
    this.file_bs64 = file_bs64;
    this.name = name;
  }
}
