/* eslint-disable no-underscore-dangle */
import { Storage } from '@ionic/storage-angular';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
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
      const user = await this._storage.get('user');
      // console.log('loadser',user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async setPetId(id: string) {
    localStorage.setItem('pet', id);
  }

  getPetId(): string | null {
    const id = localStorage.getItem('pet');
    if (id) {
      return id;
    }
    return null;
  }

  async setPetAgreement(agreement: string) {
    localStorage.setItem('agreement', agreement);
  }

  getPetAgreement(): string | null {
    const agreement = localStorage.getItem('agreement');
    if (agreement) {
      return agreement;
    }
    return null;
  }

  async setPersonaAgreement(license: string) {
    localStorage.setItem('license', license);
  }

  getPersonaAgreement(): string | null {
    const license = localStorage.getItem('license');
    if (license) {
      return license;
    }
    return null;
  }

  async setPersonHashcode(hashcode: string) {
    localStorage.setItem('person', hashcode);
  }

  async setRelativeId(id: string) {
    localStorage.setItem('id_relative', id);
  }

  getRelativeId(): string | null {
    const id = localStorage.getItem('id_relative');
    if (id) {
      return id;
    }
    return null;
  }

  getPersonHashcode(): string | null {
    const hashcode = localStorage.getItem('person');
    if (hashcode) {
      return hashcode;
    }
    return null;
  }

  async setPersonName(name: string) {
    localStorage.setItem('name', name);
  }

  getPersonName(): string | null {
    const name = localStorage.getItem('name');
    if (name) {
      return name;
    }
    return null;
  }

  async clear() {
    await this._storage.clear();
  }

  async setActiveFlag(flag: string) {
    localStorage.setItem('flag', flag);
  }

  getActiveFlag(): string | null {
    const data = localStorage.getItem('flag');
    if (data) {
      return data;
    }
    return null;
  }
}
