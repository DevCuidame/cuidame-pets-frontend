import { ClinicService } from 'src/app/services/clinic.service';
import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-pet-care-options',
    templateUrl: './pet-care-options.page.html',
    styleUrls: ['./pet-care-options.page.scss'],
    standalone: false
})
export class PetCareOptionsPage implements OnInit {
  public isClicked = false;
  public agreement: string = '';
  public vetRequest: string = '';
  public serviceRequest: boolean = false;

  constructor(
    private inAppBrows: InAppBrowser,
    public storageService: StorageService,
    public navCtrl: NavController,
    public dataService: DataService,
    private clinicService: ClinicService
  ) {
    this.serviceRequest = this.dataService.getData();
  }

  toggleClick() {
    this.isClicked = !this.isClicked;
  }

  async ngOnInit() {
    await this.getPetAgreement();
  }

  async getPetAgreement() {
    this.agreement = this.storageService.getPetAgreement();
  }

  goToVeterinarians = async () => {
    this.vetRequest = 'veterinary'
    this.clinicService.setButtons(this.vetRequest)
    this.navCtrl.navigateForward('/maps')
  };
  openWhatsappBath = async () => {
    this.vetRequest = 'lab'
    this.clinicService.setButtons(this.vetRequest)
    this.navCtrl.navigateForward('/maps')
  };
  openWhatsappHotel = async () => {
    this.vetRequest = 'all'
    this.clinicService.setButtons(this.vetRequest)
    this.navCtrl.navigateForward('/maps')
  };
  openWhatsappSpa = async () => {
    this.vetRequest = 'all'
    this.clinicService.setButtons(this.vetRequest)
    this.navCtrl.navigateForward('/maps')
  };

  openWhatsappStore = async () => {
    if (this.agreement === 'IKE') {
      this.inAppBrows.create('https://www.agrocampo.com.co/', '_system');
    } else {
      this.inAppBrows.create('https://www.agrocampo.com.co/', '_system');
    }
  };
  openWhatsappExequial = async () => {
    if (this.agreement === 'IKE') {
      this.inAppBrows.create('https://wa.link/69p5l0', '_system');
    } else {
      this.inAppBrows.create('https://wa.link/iab530', '_system');
    }
  };
}
