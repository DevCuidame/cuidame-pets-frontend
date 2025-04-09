/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable } from '@angular/core';
import { EditInfo } from '../interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  deviceNotificationID: string;
  codeRequest: string;
  isCivilAccesing: boolean;

  public registerBand = {
    code: '',
    pin: '',
    parentesco: '',
  };

  public avatar = {
    img: '',
    label: 'Ciudadano',
    seleccionado: true,
  };

  womanFlag = false;
  currentUserId = 'userid';

  public user = {};

  formEnf = {};
  listEnf: number[];

  public infoFormCondicion = {};

  listMed: number[];
  listAlergias: number[];
  formVacunas = {};

  usuarioPaciente: boolean; //Bolean que indica que el usuario será la persona que usara la manilla y no un tercero.
  usuarioRegistrado = {}; //Objeto usado para rellenar automaticamente datos del paciente cuando el paciente es el mismo usuario

  /////Edit service

  dataPaciente: EditInfo = {};

  //Variables verificacion de objeto
  verifObjeto: string;
  verifObjetoEscaneado: string;

  scanLocation = {};

  constructor() {}

  public setNotificationID(notificationId: string) {
    this.deviceNotificationID = notificationId;
  }

  public getNotificationID() {
    return this.deviceNotificationID;
  }

  public setCodeRequest(code: string) {
    this.codeRequest = code;
  }

  public getCodeRequest() {
    // console.log('hashcode dataservice',this.codeRequest);
    return this.codeRequest;
  }

  public setScanLocation(location: Record<string, unknown>) {
    this.scanLocation = location;
  }

  public getScanLocation() {
    return this.scanLocation;
  }

  public setAvatar(valor) {
    this.avatar = valor;
  }
  public getAvatar() {
    return this.avatar;
  }

  //USUARIO REGISTRADO

  public setUsuarioRegistrado(info: Record<string, unknown>) {
    this.usuarioRegistrado = info;
  }

  public getUsuarioRegistrado() {
    return this.usuarioRegistrado;
  }

  public setUsuarioPaciente(info: boolean) {
    this.usuarioPaciente = info;
  }

  public getUsuarioPaciente() {
    return this.usuarioPaciente;
  }

  //

  public setWomanFlag(flag: boolean) {
    this.womanFlag = flag;
  }
  public getWomanFlag() {
    return this.womanFlag;
  }


  private data: any;

  setData(data: any) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  private dataHeader: any;

  setDataHeader(data: any) {
    this.dataHeader = data;
  }

  getDataHeader() {
    return this.dataHeader;
  }

  private showPage: any;

  setDataPage(data: any) {
    this.showPage = data;
  }

  getDataPage() {
    return this.showPage;
  }

  private hcode: any;

  setCode(data: any) {
    this.hcode = data;
  }

  getCode() {
    return this.hcode;
  }

  private flagSubject = new BehaviorSubject<number>(-1);
  flag$ = this.flagSubject.asObservable();

  setActiveFlag(data: number) {
    this.flagSubject.next(data);
  }

  getActiveFlag(): Observable<number> {
    return this.flag$;
  }

  private req: any;

  setVetRequest(data: any) {
    this.req = data;
  }

  getVetRequest() {
    return this.req;
  }

  private image: any;

  setImage(data: any) {
    this.image = data;
  }

  getImage() {
    return this.image;
  }

  private pacientId: any;

  setPacientHashcode(data: any) {
    this.pacientId = data;
  }

  getPacientHashcode() {
    return this.pacientId;
  }

  private personOrPet: boolean;
  setPersonOrPet(data: boolean) {
    this.personOrPet = data;
  }

  getPersonOrPet() {
    return this.personOrPet;
  }

  private personName: string;
  setPersonName(data: string) {
    this.personName = data;
  }

  getPersonName() {
    return this.personName;
  }

  private personGender: string;

  setPersonGender(gender: string) {
    this.personGender = gender;
  }

  getPersonGender(): string {
    return this.personGender;
  }

  filterItems(items: any[], searchTerm: string, propertyName: string): any[] {
    if (!searchTerm || !propertyName) {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();

    return items.filter(item => item[propertyName].toLowerCase().includes(searchTerm));
  }


  private relative = new BehaviorSubject<any>(null);
  datos$ = this.relative.asObservable();

  enviarDatos(datos: any) {
    this.relative.next(datos);
  }

  private update = new BehaviorSubject<any>(null);
  update$ = this.update.asObservable();

  updateFlag(condition: any) {
    this.update.next(condition);
  }


}
