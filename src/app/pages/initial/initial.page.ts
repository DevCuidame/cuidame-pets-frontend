/* eslint-disable max-len */
import { Component, ContentChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { ToastMessage } from 'src/app/utils/toastMessage';
import { WaitMessage } from 'src/app/utils/waitMessage';
import { Keyboard } from '@capacitor/keyboard';

@Component({
    selector: 'app-initial',
    templateUrl: './initial.page.html',
    styleUrls: ['./initial.page.scss'],
    standalone: false
})
export class InitialPage implements OnInit {
  passwordVisible: boolean = false;

  closeKeyboard() {
    Keyboard.hide();
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  public showPassword: boolean = false;

  public toggleTextPassword(): void {
    this.closeKeyboard();
    this.showPassword = !this.showPassword;
  }

  resetpass() {
    this.navCtrl.navigateForward('/resetpassword');
  }

  createAccount() {
    this.navCtrl.navigateForward('/register-band');
  }

  getType(): string {
    return this.showPassword ? 'text' : 'password';
  }

  pet() {
    this.navCtrl.navigateForward('/pets');
  }

  addpet() {
    this.navCtrl.navigateForward('/pets/addpet');
  }
  editpet() {
    this.navCtrl.navigateForward('/pets/editpet');
  }

  logUser = {
    username: '',
    password: '',
  };

  constructor(
    public navCtrl: NavController,
    public toastMessage: ToastMessage,
    private userService: UserService,
    private storageService: StorageService,
    private dataService: DataService,
    public waitMessage: WaitMessage
  ) {}

  async ngOnInit() {
    await this.storageService.init();
    const user = await this.storageService.loadUser();
    if (user) {
      if (user.session_token !== null) {
        this.dataService.setUsuarioRegistrado(user);
        this.navCtrl.navigateRoot('/private/pages/home');
      }
    }
  }

  async login(fLogin: NgForm) {
    if (fLogin.valid) {
      this.waitMessage.present();
      try {
        const resp = await this.userService
          .login(fLogin, this.dataService.getNotificationID())
          .toPromise();

        if (resp.success) {
          await this.storageService.clear();

          this.navCtrl.pop();
          this.storageService.set('user', resp.data);
          this.dataService.setUsuarioRegistrado(resp.data);
          this.toastMessage.presentToast(resp.message);

          if (resp.message === 'emailnoverificado') {
            this.navCtrl.navigateRoot('/check');
          } else {
            this.navCtrl.navigateRoot('/private/pages/home');
          }
        } else {
          this.logUser.password = '';
          await this.storageService.clear();
          if (!resp.message) {
            this.waitMessage.dismiss();
            this.toastMessage.presentToast(
              'Se produjo un error al iniciar sesión, por favor intenta nuevamente'
            );
          }
        }
        this.toastMessage.presentToast(resp.message);
      } catch (e) {
        console.log('error logeando', e);
      }
    } else {
      this.toastMessage.presentToast('Por favor introduce tus credenciales');
    }
    this.waitMessage.dismiss();
  }
}
