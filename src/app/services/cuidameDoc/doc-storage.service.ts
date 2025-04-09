/* eslint-disable no-underscore-dangle */
import { Storage } from '@ionic/storage-angular';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DocStorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    //  this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  async loadUser() {
    try {
      const user = await this._storage.get('d_user');
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async clear() {
    await this._storage.clear();
  }
}
