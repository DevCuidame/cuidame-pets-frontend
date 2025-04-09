import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces';
import { DataService } from 'src/app/services/data.service';
import { PetsService } from 'src/app/services/pets/pets.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    standalone: false
})
export class HomePage implements AfterViewInit {
  public finishedLoading: boolean;
  public finishedPersonaLoading: boolean;
  public user: any;
  private subscription: Subscription = new Subscription();
  private subscriptionPersona: Subscription = new Subscription();
  public searchTerm: string = '';
  id = 0;
  public selectedButtonText: string = 'PERSONAS';
  public petsInCare: number = 0;
  public personasInCare: number = 0;
  public selectedIndicatorBorder: string = '0 20px 20px 0px';
  private defaultPhoto: string = 'assets/nophoto.jpg';

  localServerUrl = 'http://localhost:3000/';
  productionServerUrl = 'https://api.cuidame.tech/';
  uidentificador: string = '';

  pet: boolean = false;

  license = {
    code: '',
  };

  petsArray = [{ id: '', nombre: '', agreement: '', photourl: '' }];

  hashcode: '';

  name: string;
  public fullName: string;
  public photoProfile: string;
  public showCards: boolean = true;
  greeting: boolean = false;
  greetingMessage: string = '';

  type: string;
  constructor(
    public navCtrl: NavController,
    private storageService: StorageService,
    private petsService: PetsService,
    private dataService: DataService,
    private userService: UserService
  ) {
    this.finishedLoading = false;
  }



  getGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 12) {
      return (this.greetingMessage = 'Buenos días');
    } else if (currentHour >= 12 && currentHour < 18) {
      return (this.greetingMessage = 'Buenas tardes');
    } else {
      return (this.greetingMessage = 'Buenas noches');
    }
  }

  async ngAfterViewInit() {
    await this.storageService.init();
    await this.getUser();
    await this.getUsersPets();
    this.getGreeting();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goToCreatePet() {
    this.navCtrl.navigateForward('/petcode');
  }

  goToPet(id: string, agreement: string) {
    this.navCtrl.navigateForward('/private/pages/manage');
    this.storageService.setPetId(id);
    this.storageService.setPetAgreement(agreement);
    this.dataService.setPersonOrPet(true);
  }

  async getUsersPets() {
    this.storageService
      .loadUser()
      .then((user) => {
        if (user) {
          this.uidentificador = this.user.id;
          const petSubscription = this.petsService
            .getAllPets(this.uidentificador, this.user.session_token)
            .subscribe(
              (response) => {
                this.petsArray = response;
                this.petsArray
                this.petsService.animateCounter(
                  response.length,
                  (currentCount) => {
                    this.petsInCare = currentCount;
                  }
                );

                this.finishedLoading = true;
              },
              (error) => {
                console.error(error);
                this.finishedLoading = false;
              }
            );

          this.subscription.add(petSubscription);
        }
      })
      .catch((error) => {
        this.finishedLoading = false;
        this.finishedPersonaLoading = false;

        // console.error(error);
      });
  }

  private async getUser() {
    await this.storageService
      .loadUser()
      .then((userp) => {
        if (userp) {
          this.user = userp;
          this.fullName = `${userp.name} ${userp.lastname}`;

          if (userp.imagebs64 && userp.imagebs64.trim() !== '') {
            this.photoProfile = userp.imagebs64;
          } else {
            this.photoProfile = this.defaultPhoto;
          }

          const { name } = userp;
          const nameWords = name.split(' ');

          const firstName = nameWords[0];
          this.name = firstName;
          this.id = Number(this.user.id);
        }
      })
      .catch((e) => console.log('Error obteniendo user storage', e));
  }

}
