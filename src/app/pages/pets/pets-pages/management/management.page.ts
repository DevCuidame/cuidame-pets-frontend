import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces';
import { DataService } from 'src/app/services/data.service';
import { PetsService } from 'src/app/services/pets/pets.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-management',
    templateUrl: './management.page.html',
    styleUrls: ['./management.page.scss'],
    standalone: false
})
export class ManagementPage implements AfterViewInit, OnInit {

  backButtonSubscription: Subscription;

  personaAgreement: string = '';

  constructor(
    public navCtrl: NavController,
    private storageService: StorageService,
    private petsService: PetsService,
    private dataService: DataService,
    private router: Router,
    private platform: Platform,
  ) {
  }

  async ngAfterViewInit() {
    await this.storageService.init();
    await this.avalaible();
    await this.getPetId();
    await this.getUser();
    await this.getPet();
  }

  ngOnInit(): void {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(10, () => {
      this.handleBackButton();
    });
  }

  handleBackButton() {
    const currentUrl = this.router.url;

    if (currentUrl.includes('/private/pages/manage')) {
      this.router.navigate(['/private/pages/home']);
    } else{
      this.router.navigate(['/private/pages/home']);
    }
  }

  public pacientOrPet: boolean;
  public petId: string = '';
  public user: User;
  public agreement: any;
  personName: string;

  pet = {
    id: '',
    nombre: '',
  };

  async getPetId() {
    this.petId = this.storageService.getPetId();
    this.pacientOrPet = this.dataService.getPersonOrPet();
    this.personName = this.storageService.getPersonName();
  }

  async avalaible(){
    const agreement = this.storageService.getPetAgreement();
    if (agreement === undefined || agreement === 'null') {
      this.agreement = false;
    } else {
      this.agreement = true;
    }
  }


  goToPersonCare() {
    const dataToSend = true;
    this.dataService.setData(dataToSend);
    this.navCtrl.navigateForward('/private/pages/care');
  }

  goToParameters() {
    this.navCtrl.navigateRoot('/private/pages/metrics');
  }

  goToPersonInfo() {
    this.navCtrl.navigateForward('/private/relative/profile');
  }
  async getPet() {
    this.storageService
      .loadUser()
      .then((user) => {
        if (user) {
          this.petsService
            .getOnePet(this.petId, this.user.session_token)
            .subscribe(
              (response) => {
                this.pet = response;
              },
              (error) => {
                console.error(error);
              }
            );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  goToPetInfo() {
    this.navCtrl.navigateForward('/private/data/show');
  }
  goToPetCare() {
    const dataToSend = false;
    this.dataService.setData(dataToSend);
    this.navCtrl.navigateForward('/private/pages/care');
  }

  private async getUser() {
    await this.storageService
      .loadUser()
      .then((userp) => {
        if (userp) {
          this.user = userp;
          // this.dataService.user = userp;
          //console.log('User coming from storage', this.user);
          // console.log('User coming from data service',this.dataService.user);
        }
      })
      .catch((e) => console.log('Error obteniento user storage', e));
  }
}
